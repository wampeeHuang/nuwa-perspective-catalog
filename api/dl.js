// /api/dl?name=karpathy → download .md file (proxy via CDN)
const MAP = [
  ['perspective-andrej-karpathy.md', '安德烈·卡帕西', 'Andrej Karpathy', '安德烈', '卡帕西', 'Andrej', 'andrej', 'Karpathy', 'karpathy'],
  ['perspective-elon-musk.md', '埃隆·马斯克', 'Elon Musk', '硅谷钢铁侠', '埃隆', '马斯克', 'Elon', 'elon', 'Musk', 'musk'],
  ['perspective-ilya-sutskever.md', '伊利亚·苏茨克维', 'Ilya Sutskever', '伊利亚', '苏茨克维', 'Ilya', 'ilya', 'Sutskever', 'sutskever'],
  ['perspective-andrew-ng.md', '吴恩达', 'Andrew Ng', 'Andrew', 'andrew', 'Ng', 'ng'],
  ['perspective-zhang-yiming.md', '张一鸣', 'Zhang Yiming', 'Zhang', 'zhang', 'Yiming', 'yiming'],
  ['perspective-dotey.md', '宝玉', 'Jim Liu (dotey)', '大模型野生中文文档组组长', 'Jim', 'jim', 'Liu', 'liu', 'dotey'],
  ['perspective-zara-zhang.md', '张睿（张咋啦）', 'Zara Zhang', '张咋啦', '张睿', 'Zara', 'zara', 'Zhang', 'zhang'],
  ['perspective-richard-feynman.md', '理查德·费曼', 'Richard Feynman', '理查德', '费曼', 'Richard', 'richard', 'Feynman', 'feynman'],
  ['perspective-einstein.md', '阿尔伯特·爱因斯坦', 'Albert Einstein', '阿尔伯特', '爱因斯坦', 'Albert', 'albert', 'Einstein', 'einstein'],
  ['perspective-hawking.md', '斯蒂芬·霍金', 'Stephen Hawking', '斯蒂芬', '霍金', 'Stephen', 'stephen', 'Hawking', 'hawking'],
  ['perspective-liu-cixin.md', '刘慈欣', 'Liu Cixin', '大刘', 'Liu', 'liu', 'Cixin', 'cixin'],
  ['perspective-charlie-munger.md', '查理·芒格', 'Charlie Munger', '查理', '芒格', 'Charlie', 'charlie', 'Munger', 'munger'],
  ['perspective-steve-jobs.md', '史蒂夫·乔布斯', 'Steve Jobs', '史蒂夫', '乔布斯', 'Steve', 'steve', 'Jobs', 'jobs'],
  ['perspective-naval-ravikant.md', '纳瓦尔·拉维坎特', 'Naval Ravikant', '纳瓦尔', '拉维坎特', 'Naval', 'naval', 'Ravikant', 'ravikant'],
  ['perspective-alchainhust.md', '花叔', 'AlchainHust', '陈云飞'],
  ['perspective-cat-wu.md', 'Cat Wu（Catherine Wu）', 'Cat Wu', 'Cat', 'Wu', 'cat', 'wu'],
  ['perspective-nassim-taleb.md', '纳西姆·塔勒布', 'Nassim Nicholas Taleb', '纳西姆', '塔勒布', 'Nassim', 'nassim', 'Nicholas', 'nicholas', 'Taleb', 'taleb'],
  ['perspective-claude-hopkins.md', '克劳德·霍普金斯', 'Claude Hopkins', '克劳德', '霍普金斯', 'Claude', 'claude', 'Hopkins', 'hopkins'],
  ['perspective-david-ogilvy.md', '大卫·奥格威', 'David Ogilvy', '大卫', '奥格威', 'David', 'david', 'Ogilvy', 'ogilvy'],
  ['perspective-joseph-sugarman.md', '乔·舒格曼', 'Joe Sugarman', '舒格曼', 'Joe', 'joe', 'Sugarman', 'sugarman', '休格曼'],
  ['perspective-mrbeast.md', 'MrBeast（野兽先生）', 'MrBeast', 'mrbeast', '野兽先生'],
  ['perspective-sun-yuchen.md', '孙宇晨', 'Justin Sun', 'Justin', 'justin', 'Sun', 'sun', '孙割'],
  ['perspective-paul-graham.md', '保罗·格雷厄姆', 'Paul Graham', 'PG', '保罗', '格雷厄姆', 'Paul', 'paul', 'Graham', 'graham', 'pg'],
  ['perspective-x-mentor.md', 'X/Twitter运营导师', 'X Growth Mentor', 'Growth', 'growth', 'Mentor', 'mentor', 'x运营', 'twitter运营'],
  ['perspective-zhang-xuefeng.md', '张雪峰', 'Zhang Xuefeng', '雪峰老师', 'Zhang', 'zhang', 'Xuefeng', 'xuefeng'],
  ['perspective-nolan.md', '克里斯托弗·诺兰', 'Christopher Nolan', '克里斯托弗', '诺兰', 'Christopher', 'christopher', 'Nolan', 'nolan'],
  ['perspective-villeneuve.md', '丹尼斯·维伦纽瓦', 'Denis Villeneuve', '丹尼斯', '维伦纽瓦', 'Denis', 'denis', 'Villeneuve', 'villeneuve'],
  ['perspective-masaaki-yuasa.md', '汤浅政明', 'Masaaki Yuasa', 'Masaaki', 'masaaki', 'Yuasa', 'yuasa'],
  ['perspective-tim-pan.md', '潘天鸿', 'Tim Pan', 'Tim', 'tim', 'Pan', 'pan', '影视飓风'],
  ['perspective-shen-yifei.md', '沈奕斐', 'Shen Yifei', 'Shen', 'shen', 'Yifei', 'yifei'],
  ['perspective-donald-trump.md', '唐纳德·特朗普', 'Donald Trump', '懂王', '唐纳德', '特朗普', 'Donald', 'donald', 'Trump', 'trump'],
  ['perspective-rory-sutherland.md', '罗里·萨瑟兰', 'Rory Sutherland', '罗里', '萨瑟兰', 'Rory', 'rory', 'Sutherland', 'sutherland'],
  ['perspective-youyu-designer.md', '有余', 'Youyu', 'youyu'],
  ['perspective-ben-smith.md', '本·史密斯', 'Ben Smith', '史密斯', 'Ben', 'ben', 'Smith', 'smith'],
  ['perspective-james-burke.md', '詹姆斯·伯克', 'James Burke', '詹姆斯', '伯克', 'James', 'james', 'Burke', 'burke'],
  ['perspective-alan-cooper.md', '艾伦·库珀', 'Alan Cooper', '艾伦', '库珀', 'Alan', 'alan', 'Cooper', 'cooper'],
  ['perspective-bret-victor.md', '布雷特·维克托', 'Bret Victor', '布雷特', '维克托', 'Bret', 'bret', 'Victor', 'victor'],
  ['perspective-don-norman.md', '唐·诺曼', 'Don Norman', '诺曼', 'Don', 'don', 'Norman', 'norman'],
  ['perspective-yu-jun.md', '俞军', 'Yu Jun', '中国产品方法论之父', 'Yu', 'yu', 'Jun', 'jun'],
  ['perspective-zhang-xiaolong.md', '张小龙', 'Allen Zhang', '微信之父', 'Allen', 'allen', 'Zhang', 'zhang'],
  ['perspective-liang-ning.md', '梁宁', 'Liang Ning', '产品思维布道者', 'Liang', 'liang', 'Ning', 'ning'],
  ['perspective-wan-weigang.md', '万维钢', 'Wan Weigang', '同人于野', 'Wan', 'wan', 'Weigang', 'weigang'],
  ['perspective-hoyte-van-hoytema.md', '霍伊特·范·霍伊特玛', 'Hoyte van Hoytema', '霍伊特', '霍伊特玛', 'Hoyte', 'hoyte', 'van', 'Hoytema', 'hoytema', 'van hoytema'],
  ['perspective-rem-koolhaas.md', '雷姆·库哈斯', 'Rem Koolhaas', '雷姆', '库哈斯', 'Rem', 'rem', 'Koolhaas', 'koolhaas'],
  ['perspective-santiago-calatrava.md', '圣地亚哥·卡拉特拉瓦', 'Santiago Calatrava', '圣地亚哥', '卡拉特拉瓦', 'Santiago', 'santiago', 'Calatrava', 'calatrava'],
  ['perspective-jiaoshouyixiaoxing.md', '叫兽易小星', 'Jiaoshou Yixiaoxing', '叫兽', 'Jiaoshou', 'jiaoshou', 'Yixiaoxing', 'yixiaoxing'],
  ['perspective-keda.md', '柯达', 'Ke Da', 'Ke', 'ke', 'Da', 'da'],
  ['perspective-liuxunzimo.md', '刘循子墨', 'Liu Xunzimo', '子墨', 'Liu', 'liu', 'Xunzimo', 'xunzimo'],
  ['perspective-lei-jun.md', '雷军', 'Lei Jun', '雷布斯', 'Lei', 'lei', 'Jun', 'jun'],
  ['perspective-donella-meadows.md', '德内拉·梅多斯', 'Donella H. Meadows', '德内拉', '梅多斯', 'Donella', 'donella', 'Meadows', 'meadows'],
  ['perspective-kevin-kelly.md', '凯文·凯利', 'Kevin Kelly', 'KK', '凯文', '凯利', 'Kevin', 'kevin', 'Kelly', 'kelly', 'kk', '凯文凯利'],
  ['perspective-norbert-wiener.md', '诺伯特·维纳', 'Norbert Wiener', '诺伯特', '维纳', 'Norbert', 'norbert', 'Wiener', 'wiener'],
  ['perspective-christopher-alexander.md', '克里斯托弗·亚历山大', 'Christopher Alexander', '克里斯托弗', '亚历山大', 'Christopher', 'christopher', 'Alexander', 'alexander'],
  ['perspective-hans-rosling.md', '汉斯·罗斯林', 'Hans Rosling', '汉斯', '罗斯林', 'Hans', 'hans', 'Rosling', 'rosling'],
  ['perspective-joseph-campbell.md', '约瑟夫·坎贝尔', 'Joseph Campbell', '约瑟夫', '坎贝尔', 'Joseph', 'joseph', 'Campbell', 'campbell'],
];

const LOOKUP = {};
for (const [file, ...aliases] of MAP) {
  for (const a of aliases) LOOKUP[a.toLowerCase()] = file;
}

const CDN = 'https://cdn.jsdelivr.net/gh/wampeeHuang/nuwa-perspective-catalog@master/skills/';

export default async function handler(req, res) {
  const raw = (req.query.name || '').trim();
  if (!raw) {
    res.status(400).json({ error: 'Missing ?name=', hint: 'Example: /api/dl?name=卡帕西' });
    return;
  }
  const file = LOOKUP[raw.toLowerCase()];
  if (!file) {
    res.status(404).json({ error: `"${raw}" not found`, hint: 'Try Chinese or English name' });
    return;
  }
  const url = CDN + file;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`CDN ${r.status}`);
    const body = await r.text();
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(file)}"`);
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.status(200).send(body);
  } catch (e) {
    // Fallback: redirect to CDN
    res.redirect(302, url);
  }
}
