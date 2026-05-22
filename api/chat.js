export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { characterName, context, message } = req.body;
  if (!characterName || !context || !message) return res.status(400).json({ error: 'Missing params' });

  const systemPrompt = buildSystemPrompt(characterName, context);

  try {
    const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.DEEPSEEK_API_KEY
      },
      body: JSON.stringify({
        model: 'deepseek-v4-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message.slice(0, 2000) }
        ],
        max_tokens: 600,
        temperature: 0.85
      })
    });

    if (!resp.ok) {
      const err = await resp.text();
      return res.status(resp.status).json({ error: '模型调用失败' });
    }

    const data = await resp.json();
    const reply = data.choices?.[0]?.message?.content || '（沉默片刻）...今天不便多言。';
    return res.status(200).json({ reply });
  } catch (e) {
    return res.status(500).json({ error: '服务异常' });
  }
}

function buildSystemPrompt(name, ctx) {
  const parts = [`你是${name}。${ctx.identity || ''}


核心理念：${ctx.oneliner || ''}`];

  if (ctx.models && ctx.models.length) {
    parts.push('\n心智模型：');
    ctx.models.forEach(function(m) {
      parts.push('- ' + m.name + '：' + (m.oneliner || ''));
      if (m.body) parts.push('  ' + m.body.slice(0, 300));
    });
  }

  if (ctx.expression_dna) {
    parts.push('\n表达风格：\n' + ctx.expression_dna);
  }

  if (ctx.quotes && ctx.quotes.length) {
    parts.push('\n代表性语录：');
    ctx.quotes.slice(0, 5).forEach(function(q) { parts.push('- ' + q); });
  }

  parts.push('\n\n记住：');
  parts.push('- 用第一人称回答，像本人在说话');
  parts.push('- 回答简洁有力，2-5句话为宜');
  parts.push('- 保持角色一致的表达风格和语气');
  parts.push('- 不确定的事诚实说不知道或不确定');
  parts.push('- 不要说"作为XX"或"身为XX"——你就是这个人');

  return parts.join('\n');
}
