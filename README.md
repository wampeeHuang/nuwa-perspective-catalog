# 女娲人物蒸馏 · 35位思维顾问

基于公开信息蒸馏的思维操作系统。每个人物是独立可用的思维镜片——下载 SKILL.md，放入 Claude Code，即可进入那个人物的心智模式。

## 快速开始

### 方式一：下载整个仓库（推荐）

```bash
git clone https://github.com/wampeeHuang/nuwa-perspective-catalog.git
```

Clone 后在本地打开 `index.html` 即可可视化浏览全部人物（需本地服务器：`python -m http.server 8090`）。

### 方式二：只下载一个人物

不想下全部 35 个？直接下载你需要的那个：

```bash
# 以卡帕西为例，换掉文件名即可
# 国内推荐用 jsDelivr CDN（速度快、稳定）
curl -O https://cdn.jsdelivr.net/gh/wampeeHuang/nuwa-perspective-catalog@master/skills/perspective-karpathy.md

# 或 GitHub 直链（国内可能慢）
curl -O https://raw.githubusercontent.com/wampeeHuang/nuwa-perspective-catalog/master/skills/perspective-karpathy.md
```

**最简单的筛选方式**：打开 [blackcamellia.xin](https://blackcamellia.xin) → 浏览人物卡片 → 找到想要的 → 点卡片上的下载按钮，直接下载单个 SKILL.md。

### 安装

将 `perspective-*.md` 重命名为 `SKILL.md`，放入：

- **Claude Code CLI**: `~/.claude/skills/<skill-name>/SKILL.md`
- 放入后 Claude Code 会自动识别，用触发词即可激活

## 触发方式

每个人物 skill 激活后直接以该人物的身份回应。在对话中说出对应触发词即可：

| 人物 | 触发词 |
|------|--------|
| 安德烈·卡帕西 | `卡帕西` `Karpathy` `Andrej Karpathy` |
| 埃隆·马斯克 | `马斯克` `Elon` `Elon Musk` |
| 伊利亚·苏茨克维 | `Ilya` `Ilya Sutskever` `苏茨克维` |
| 吴恩达 | `吴恩达` `Andrew Ng` |
| 张一鸣 | `张一鸣` `Zhang Yiming` |
| 宝玉 | `宝玉` `dotey` `Jim Liu` |
| Zara Zhang | `Zara` `Zara Zhang` `张咋啦` `张睿` |
| 花叔 | `花叔` `AlchainHust` `陈云飞` |
| Cat Wu | `Cat Wu` `Catherine Wu` |
| 理查德·费曼 | `费曼` `Feynman` `Richard Feynman` |
| 阿尔伯特·爱因斯坦 | `爱因斯坦` `Einstein` `Albert Einstein` |
| 斯蒂芬·霍金 | `霍金` `Hawking` `Stephen Hawking` |
| James Burke | `James Burke` |
| 查理·芒格 | `芒格` `Charlie Munger` |
| 史蒂夫·乔布斯 | `乔布斯` `Steve Jobs` |
| Naval Ravikant | `Naval` `Naval Ravikant` |
| 纳西姆·塔勒布 | `塔勒布` `Nassim Taleb` `Taleb` |
| 克劳德·霍普金斯 | `霍普金斯` `Claude Hopkins` |
| 大卫·奥格威 | `奥格威` `David Ogilvy` |
| 乔·休格曼 | `休格曼` `Joe Sugarman` |
| MrBeast | `MrBeast` `Jimmy Donaldson` |
| 孙宇晨 | `孙宇晨` `Justin Sun` `孙割` |
| Rory Sutherland | `Rory` `Rory Sutherland` `萨瑟兰` |
| Paul Graham | `Paul Graham` `PG` |
| X/Twitter运营导师 | `X Mentor` `Twitter增长` `X运营` |
| 张雪峰 | `张雪峰` `雪峰老师` |
| Ben Smith | `Ben Smith` |
| 克里斯托弗·诺兰 | `诺兰` `Nolan` `Christopher Nolan` |
| Denis Villeneuve | `Villeneuve` `维伦纽瓦` |
| 汤浅政明 | `汤浅政明` `Masaaki Yuasa` |
| Tim 潘天鸿 | `Tim` `Tim Pan` `潘天鸿` `影视飓风` |
| 刘慈欣 | `刘慈欣` `Liu Cixin` `大刘` |
| 沈奕斐 | `沈奕斐` `Shen Yifei` |
| 唐纳德·特朗普 | `特朗普` `Trump` `Donald Trump` |
| 设计师有余 | `有余` `Youyu` |

## 按场景选人

不确定找谁时，从这里开始：

| 场景 | 推荐人物 |
|------|----------|
| 做重大决策，怕自己骗自己 | 费曼、芒格、塔勒布 |
| 评估 AI 产品/技术前景 | 卡帕西、吴恩达、张一鸣 |
| 写文章/做内容，提升传播力 | Paul Graham、奥格威、休格曼 |
| 砍成本/优化流程 | 马斯克、芒格、乔布斯 |
| 学一个新技术/新领域 | 费曼、Naval、卡帕西 |
| 设计产品/用户体验 | 乔布斯、有余、卡帕西 |
| 搞营销/增长/拉新 | 孙宇晨、MrBeast、霍普金斯 |
| 职业迷茫，不知道做什么 | Naval、花叔、张雪峰 |
| 谈判/博弈/权力局面 | 特朗普、塔勒布、张一鸣 |
| 写代码/架构设计 | 卡帕西、宝玉、Zara Zhang |
| 拍视频/影视创作 | Tim 潘、MrBeast、诺兰 |
| 教育/学习路径选择 | 费曼、张雪峰、吴恩达 |
| 内容创作/公众号写作 | Paul Graham、奥格威、花叔 |

## 人物全表（35位）

| 分类 | 人物 |
|------|------|
| 科技/AI | 卡帕西、吴恩达、张一鸣、Ilya Sutskever、Zara Zhang、宝玉、马斯克、花叔、Cat Wu |
| 科学/物理 | 费曼、爱因斯坦、霍金、James Burke、刘慈欣 |
| 商业/投资 | 芒格、Naval、乔布斯 |
| 风险/概率 | 塔勒布 |
| 营销/广告 | 奥格威、霍普金斯、休格曼、孙宇晨、MrBeast、Rory Sutherland |
| 内容/写作 | Paul Graham、花叔、张雪峰、Ben Smith |
| 影视/创作 | 诺兰、Tim潘、汤浅政明、Villeneuve |
| 社会/人文 | 特朗普、沈奕斐、Rory Sutherland、有余、Cat Wu |

## Skill 结构

每个人物 skill 包含：

- **身份卡**: 人物背景与定位
- **核心心智模型**: 5-10 个思维框架，含理论、案例、应用方式、局限
- **决策启发式**: 8-19 条可操作的行为规则
- **表达 DNA**: 句式、词汇、节奏、幽默方式
- **价值观与内在张力**: 追求什么、拒绝什么、矛盾是什么
- **诚实边界**: 明确 skill 的适用场景与不适用场景

## 在线浏览

完整的人物目录可在 [blackcamellia.xin](https://blackcamellia.xin) 浏览，按分类筛选、按场景推荐、点击卡片查看每个人物的完整心智模型。

## 交流

扫码加入「思维顾问局」交流群，提名你想蒸馏的人物。

## 来源

- 蒸馏工具：[女娲.skill](https://github.com/wampeeHuang/nuwa-perspective-catalog/blob/master/skills/perspective-alchainhust.md) — 感谢花叔（AlchainHust / 陈云飞）的原创方法论与工具链，让每个人的思维模型可被结构化蒸馏
- 数据截止：2026-04
- 所有内容基于公开信息提炼，非人物本人授权
