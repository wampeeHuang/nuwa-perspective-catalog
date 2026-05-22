// Generate api/dl.js lookup map from _data/data.js
// Usage: node _scripts/gen_dl.js
// Auto-extracts aliases from Chinese/English names + manual overrides below.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const dataJs = fs.readFileSync(path.join(ROOT, '_data', 'data.js'), 'utf8');
const json = dataJs.replace('window.__CHARACTERS__ = ', '').replace(/;\s*$/, '');
const chars = JSON.parse(json);

// Manual extra aliases keyed by id (e.g. common misspellings, English handles)
const EXTRA = {
  'perspective-andrej-karpathy': ['karpathy', 'andrej'],
  'perspective-elon-musk': ['musk', 'elon', '马斯克'],
  'perspective-ilya-sutskever': ['ilya', '苏茨克维'],
  'perspective-andrew-ng': ['andrew', 'ng'],
  'perspective-dotey': ['dotey'],
  'perspective-zara-zhang': ['zara'],
  'perspective-richard-feynman': ['feynman', '费曼'],
  'perspective-einstein': ['einstein', '爱因斯坦'],
  'perspective-hawking': ['hawking', '霍金'],
  'perspective-charlie-munger': ['munger', '芒格'],
  'perspective-steve-jobs': ['jobs', '乔布斯'],
  'perspective-naval-ravikant': ['naval'],
  'perspective-alchainhust': ['AlchainHust', '陈云飞'],
  'perspective-nassim-taleb': ['taleb', '塔勒布'],
  'perspective-claude-hopkins': ['hopkins', '霍普金斯'],
  'perspective-david-ogilvy': ['ogilvy', '奥格威'],
  'perspective-joseph-sugarman': ['sugarman', '休格曼'],
  'perspective-mrbeast': ['mrbeast', '野兽先生'],
  'perspective-sun-yuchen': ['孙割'],
  'perspective-paul-graham': ['pg', 'PG'],
  'perspective-x-mentor': ['x运营', 'twitter运营'],
  'perspective-zhang-xuefeng': ['雪峰老师'],
  'perspective-nolan': ['nolan', '诺兰'],
  'perspective-villeneuve': ['villeneuve', '维伦纽瓦'],
  'perspective-tim-pan': ['tim', '影视飓风'],
  'perspective-donald-trump': ['trump', '特朗普', '懂王'],
  'perspective-rory-sutherland': ['rory', '萨瑟兰'],
  'perspective-alan-cooper': ['cooper', '库珀', 'alan'],
  'perspective-bret-victor': ['victor', '维克托', 'bret'],
  'perspective-don-norman': ['norman', '诺曼', 'don'],
  'perspective-hoyte-van-hoytema': ['hoyte', 'van hoytema', '霍伊特'],
};

function makeAliases(c) {
  const set = new Set();
  if (c.name_cn) set.add(c.name_cn);
  if (c.name_en) set.add(c.name_en);
  if (c.nickname) set.add(c.nickname);

  // Auto-extract from Chinese name parts (split by · or （)
  if (c.name_cn) {
    const clean = c.name_cn.replace(/（.*?）/, '').trim();
    const parts = clean.split(/[·\s]+/).filter(p => p.length >= 2);
    parts.forEach(p => set.add(p));
  }

  // Auto-extract from English name parts (first, last, lowercase)
  if (c.name_en) {
    const enParts = c.name_en.split(/\s+/);
    enParts.forEach(p => {
      const clean = p.replace(/[^a-zA-Z]/g, '');
      if (clean.length >= 2) { set.add(clean); set.add(clean.toLowerCase()); }
    });
  }

  // Extra manual aliases
  (EXTRA[c.id] || []).forEach(a => set.add(a));

  return [...set];
}

const mapLines = chars.map(c => {
  const aliases = makeAliases(c);
  return `  ['${c.id}.md', ${aliases.map(a => `'${a}'`).join(', ')}],`;
}).join('\n');

const dlPath = path.join(ROOT, 'api', 'dl.js');
let dlJs = fs.readFileSync(dlPath, 'utf8');
dlJs = dlJs.replace(
  /const MAP = \[[\s\S]*?\];/,
  `const MAP = [\n${mapLines}\n];`
);
fs.writeFileSync(dlPath, dlJs);
console.log(`api/dl.js updated with ${chars.length} characters`);
