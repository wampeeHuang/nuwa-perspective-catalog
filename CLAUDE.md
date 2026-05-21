# 女娲人物蒸馏 公开网站

## 项目
- 35位人物思维顾问目录站，归藏水墨风
- 单 HTML 文件 + JSON 数据，纯静态
- 部署：Vercel，域名 blackcamellia.xin

## 结构
```
index.html      # 主站（CSS + HTML + JS 合一）
_data/          # 35人JSON数据（data.js）
assets/         # SVG印章、笔触等静态资源
```

## 规则
- 不改 _data/ JSON 格式——改数据结构要在源头（人物研究目录）做
- CSS 变量走归藏 Style A 墨水经典 token
- 不引入框架，保持单文件自包含
- _runtime/ 放临时文件，不进 git
