import { Redis } from '@upstash/redis';

const MAX_LEN = 200;
const MAX_HISTORY = 100;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN,
});

function mkToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const url = new URL(req.url, 'http://localhost');
      const characterId = url.searchParams.get('characterId');
      const statsOnly = url.searchParams.get('stats') === 'true';
      const msgs = await redis.lrange('board:messages', 0, MAX_HISTORY - 1);
      const parsed = msgs || [];

      if (statsOnly) {
        const counts = {};
        for (const m of parsed) {
          if (m.characterId) {
            counts[m.characterId] = (counts[m.characterId] || 0) + 1;
          }
        }
        const sorted = Object.entries(counts)
          .map(([id, n]) => ({ characterId: id, count: n }))
          .sort((a, b) => b.count - a.count);
        return res.status(200).json(sorted);
      }

      const filtered = characterId
        ? parsed.filter(function(m) { return m.characterId === characterId; })
        : parsed;
      // merge likes, strip delToken
      const likes = await redis.hgetall('board:likes') || {};
      const withLikes = filtered.map(function(m) {
        var copy = Object.assign({}, m, { likes: Number(likes[m.id]) || 0 });
        delete copy.delToken;
        return copy;
      });
      return res.status(200).json(withLikes);
    } catch (e) {
      return res.status(200).json([]);
    }
  }

  if (req.method === 'POST') {
    const body = req.body || {};

    // like action
    if (body.action === 'like' && body.id) {
      try {
        const n = await redis.hincrby('board:likes', body.id, 1);
        return res.status(200).json({ ok: true, likes: n });
      } catch (e) {
        return res.status(500).json({ error: 'Like failed' });
      }
    }

    // delete action
    if (body.action === 'delete' && body.id && body.delToken) {
      try {
        const all = await redis.lrange('board:messages', 0, MAX_HISTORY - 1);
        var found = null;
        for (var i = 0; i < all.length; i++) {
          if (all[i].id === body.id) {
            if (all[i].delToken !== body.delToken) {
              return res.status(403).json({ error: 'Not yours' });
            }
            found = all[i];
            break;
          }
        }
        if (!found) return res.status(404).json({ error: 'Not found' });
        // remove matching JSON string
        await redis.lrem('board:messages', 1, found);
        // also remove replies to this message
        var replies = all.filter(function(m) { return m.parentId === body.id; });
        for (var j = 0; j < replies.length; j++) {
          await redis.lrem('board:messages', 1, replies[j]);
        }
        return res.status(200).json({ ok: true });
      } catch (e) {
        return res.status(500).json({ error: 'Delete failed' });
      }
    }

    const { text, characterName, parentId, characterId } = body;
    if (!text || typeof text !== 'string') return res.status(400).json({ error: 'Missing text' });

    const clean = text.trim().slice(0, MAX_LEN);
    if (!clean) return res.status(400).json({ error: 'Empty' });

    // moderation
    try {
      const mr = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.DEEPSEEK_API_KEY
        },
        body: JSON.stringify({
          model: 'deepseek-v4-flash',
          messages: [
            { role: 'system', content: '只回答一个字"是"或"否"。以下内容是否包含违法、色情、赌博、暴力、人身攻击或骚扰信息？' },
            { role: 'user', content: clean }
          ],
          max_tokens: 4,
          temperature: 0
        })
      });
      const md = await mr.json();
      if (md.choices?.[0]?.message?.content?.trim().startsWith('是')) {
        return res.status(200).json({ ok: true });
      }
    } catch (e) {}

    var visitorName = characterName || '';
    if (!visitorName) {
      visitorName = '路人' + String(Date.now() % 1000);
    }

    const msg = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: clean,
      characterName: visitorName,
      parentId: parentId || null,
      characterId: characterId || null,
      delToken: mkToken(),
      time: Date.now()
    };

    try {
      await redis.lpush('board:messages', msg);
      await redis.ltrim('board:messages', 0, MAX_HISTORY - 1);
    } catch (e) {
      return res.status(500).json({ error: 'Storage error' });
    }

    var out = Object.assign({}, msg, { likes: 0 });
    return res.status(200).json({ ok: true, msg: out });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
