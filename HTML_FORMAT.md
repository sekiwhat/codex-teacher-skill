# Teacher HTML Format

本文件是 `teacher` skill 生成教学 HTML 时的**强制格式规范**。每次生成或重做 HTML 前必须完整读取本文件；除非用户本次明确要求另一种视觉样式，否则不得自行替换设计语言。

## 1. 格式来源与优先级

- 标准参考文件：`/Users/qhs/2026Spring/概率论/md/1-6/hybrid_auto/teaching_1-6.html`
- 本文件是该参考文件的可复用格式说明，适用于所有由 teacher skill 创建的 HTML。
- 内容正确性、中英文配对规则和公式安全规则仍以 `SKILL.md` 为准。
- 视觉格式、页面结构、CSS 组件和排版以本文件为准。
- 若本文件与 `SKILL.md` 内旧版 HTML 模板冲突，**本文件优先**。
- 可以根据学科内容增加必要组件，但不得改变整体视觉体系。

## 2. 页面视觉语言

使用克制、清晰、适合长篇阅读的“课程讲义”风格：

- 页面背景：浅灰蓝 `#edf3f5`
- 正文纸张：暖白 `#fffdf8`
- 封面：深青色 `#163e4d`
- 封面底部强调线：金色 `#e5b24a`
- 正文主色：深墨色 `#172033`
- 英文与中文上下紧邻，不使用左右双栏翻译
- 正文最大宽度约 `980px`
- 主体使用轻微阴影，知识框使用扁平色块与左侧色条
- 不使用悬浮动画、夸张圆角、渐变卡片或大量 emoji 装饰

## 3. 必须使用的页面骨架

```html
<!doctype html>
<html lang="[en 或 zh-CN]">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>[English title] [中文标题]：教学讲解</title>
  <!-- KaTeX 资源与初始化 -->
  <style>
    /* 使用本文件第 4 节的设计系统 */
  </style>
</head>
<body>
  <header>
    <div class="wrap">
      <div class="eyebrow">[Course · Lesson range · 中文课程信息]</div>
      <h1>[English title]<br>[中文标题]</h1>
      <p lang="en">[English one-sentence introduction]</p>
      <p lang="zh-CN">[中文一句话简介]</p>
    </div>
  </header>

  <main>
    <nav aria-label="Table of contents">
      <!-- 每个目录项中英文同行 -->
    </nav>

    <section id="...">
      <!-- 教学内容 -->
    </section>
  </main>

  <footer>[Course · Lesson range · Teaching Notes]</footer>
</body>
</html>
```

要求：

- 必须有独立 `<header>` 封面、`<main>` 正文和 `<footer>`。
- 目录紧接封面后的正文顶部。
- 每个大主题使用一个 `<section id="...">`。
- 不再使用“所有内容包在 `.container` 中并以大卡片堆叠”的旧版结构。

## 4. 标准 CSS 设计系统

以下样式是基线。可以添加内容所需的类，但不得删除核心变量、封面、正文、目录、中英文配对、知识框、表格、响应式和打印规则。

```css
:root {
  --ink: #172033;
  --muted: #5d6678;
  --paper: #fffdf8;
  --canvas: #edf3f5;
  --line: #d8e0e5;
  --blue: #176b87;
  --blue-soft: #e8f5f8;
  --green: #287a55;
  --green-soft: #eaf7ef;
  --gold: #a65f08;
  --gold-soft: #fff4dd;
  --red: #a43b3b;
  --red-soft: #fff0ef;
  --violet: #6550a5;
  --violet-soft: #f1edfb;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  color: var(--ink);
  background: var(--canvas);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.72;
}
header {
  color: white;
  background: #163e4d;
  padding: 54px 24px 48px;
  border-bottom: 7px solid #e5b24a;
}
header .wrap, main {
  width: min(980px, calc(100% - 32px));
  margin: 0 auto;
}
.eyebrow {
  font-weight: 750;
  color: #cde9ef;
  text-transform: uppercase;
  font-size: .78rem;
}
h1 {
  margin: 8px 0 12px;
  max-width: 850px;
  font-size: clamp(2rem, 5vw, 3.7rem);
  line-height: 1.08;
}
header p {
  margin: 0;
  max-width: 790px;
  color: #e8f2f4;
  font-size: 1.08rem;
}
main {
  background: var(--paper);
  padding: 36px clamp(20px, 5vw, 58px) 70px;
  box-shadow: 0 12px 40px rgba(31, 50, 60, .10);
}
nav {
  border-bottom: 1px solid var(--line);
  padding-bottom: 28px;
  margin-bottom: 32px;
  columns: 2;
  column-gap: 32px;
}
nav a {
  display: block;
  color: var(--blue);
  text-decoration: none;
  padding: 4px 0;
  break-inside: avoid;
}
nav a:hover { text-decoration: underline; }
section {
  padding: 28px 0;
  border-top: 1px solid var(--line);
}
section:first-of-type { border-top: 0; }
h2 {
  margin: 0 0 16px;
  font-size: clamp(1.55rem, 3vw, 2.05rem);
  line-height: 1.22;
  color: #143f50;
}
h3 {
  margin: 25px 0 8px;
  font-size: 1.18rem;
  color: #293b50;
}
p { margin: 10px 0; }
ul, ol { padding-left: 24px; }
li { margin: 5px 0; }
.box {
  margin: 18px 0;
  padding: 16px 18px;
  border-left: 5px solid var(--blue);
  background: var(--blue-soft);
}
.definition { border-color: var(--violet); background: var(--violet-soft); }
.theorem { border-color: var(--green); background: var(--green-soft); }
.warning { border-color: var(--red); background: var(--red-soft); }
.example { border-color: var(--gold); background: var(--gold-soft); }
.box strong:first-child { display: block; margin-bottom: 4px; }
.math-block { overflow-x: auto; padding: 5px 0; }
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 18px 0;
}
.mini {
  border: 1px solid var(--line);
  padding: 15px;
  background: #fff;
  border-radius: 6px;
}
.proof {
  border-left: 2px solid #b7c3ca;
  padding-left: 18px;
  margin: 14px 0;
}
.proof::before {
  content: "Proof · 证明。";
  font-weight: 800;
  color: #344655;
}
.pair { margin: 12px 0; }
.pair > span { display: block; }
.pair > span[lang="zh-CN"] {
  margin-top: 3px;
  color: #435460;
  font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
}
.zh-inline {
  color: #49636e;
  font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-weight: inherit;
}
h2 .zh-inline { margin-left: .32em; }
h3 .zh-inline, strong .zh-inline { margin-left: .2em; }
.step {
  display: inline-grid;
  place-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #183f4e;
  color: white;
  font-weight: 800;
  margin-right: 7px;
  font-size: .82rem;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 18px 0;
}
th, td {
  border: 1px solid var(--line);
  padding: 10px;
  text-align: left;
  vertical-align: top;
}
th { background: #edf5f6; }
footer {
  text-align: center;
  color: var(--muted);
  padding: 28px 16px 45px;
}
/* 此处还必须内联 assets/highlighter.css 的完整内容。 */
@media (max-width: 700px) {
  nav { columns: 1; }
  .grid { grid-template-columns: 1fr; }
  header { padding-top: 38px; }
  main {
    width: 100%;
    padding-left: 18px;
    padding-right: 18px;
    box-shadow: none;
  }
  .katex-display { font-size: .93em; }
}
@media print {
  body { background: white; }
  header {
    background: white;
    color: black;
    border-bottom: 2px solid black;
  }
  header p, .eyebrow { color: #333; }
  main { box-shadow: none; width: 100%; }
  nav { display: none; }
  section { break-inside: avoid-page; }
}
```

## 5. 中英文排版组件

### 标题、术语、短标签

英文与中文同行：

```html
<h2>Conditional Probability <span class="zh-inline">条件概率</span></h2>
<strong>Definition <span class="zh-inline">定义</span></strong>
```

### 长句和段落

英文在上，中文立即紧接：

```html
<p class="pair">
  <span lang="en">Probability is the mathematics of uncertainty.</span>
  <span lang="zh-CN">概率是研究不确定性的数学。</span>
</p>
```

### 目录

```html
<a href="#conditional">
  <span>1. Conditional probability</span>
  <span class="nav-zh">1. 条件概率</span>
</a>
```

为 `.nav-zh` 设置中文颜色与小间距：

```css
nav a span { display: inline; }
nav a .nav-zh { color: #4f6670; margin-left: .25em; }
```

### 列表与表格

- 每个列表项内部立即提供对应中文。
- 表格每个单元格内完成中英配对，不能整张英文表之后再放中文表。
- 数学公式若两种语言完全相同，只显示一次。

## 6. 教学组件映射

| 内容 | HTML 组件 |
|---|---|
| 普通直观解释 | `<div class="box">` |
| 定义 | `<div class="definition box">` |
| 定理、结论、最终答案 | `<div class="theorem box">` |
| 生活例子、例题 | `<div class="example box">` |
| 易错点、概念辨析 | `<div class="warning box">` |
| 证明 | `<div class="proof">` |
| 并列小知识点 | `.grid` + `.mini` |
| 分步解题 | `.step` 编号 |
| 展示公式 | `.math-block` 内使用 `$$...$$` 或 `\[...\]` |

不要把每个段落都塞进彩色框。知识框只用于有明确教学功能的内容。

## 7. KaTeX 与公式安全

KaTeX 初始化必须支持四类定界符：

```js
delimiters: [
  { left: '$$', right: '$$', display: true },
  { left: '$', right: '$', display: false },
  { left: '\\(', right: '\\)', display: false },
  { left: '\\[', right: '\\]', display: true }
]
```

- `.math-block` 中只使用展示公式定界符。
- HTML 源码中的公式裸 `<`、`>` 必须写为 `&lt;`、`&gt;`。
- LaTeX 对齐符 `&` 在 HTML 源码中必须写为 `&amp;`。
- KaTeX CDN 版本在同一文件内必须一致。

## 8. 强制文字高亮功能

每个 teacher HTML 默认必须带有可持久化的文字高亮器。除非用户明确要求移除，否则不可省略。

### 必须支持

- 鼠标或键盘选择正文文字后弹出浮动工具栏。
- 使用 `<input type="color">` 自定义任意高亮颜色。
- 点击已有高亮后可以修改颜色或删除。
- 提供“全部清除”按钮，并在清除前确认。
- 使用 `localStorage` 自动保存；存储键必须包含 `location.pathname`，让不同 HTML 文件互不影响。
- 页面重新打开后自动恢复高亮。
- 禁止高亮目录、按钮、脚本、样式、KaTeX 渲染结果和 `.math-block`，避免破坏公式结构。
- 不允许新高亮与已有高亮重叠，并给出中英文提示。
- 本地存储不可用时，页面仍能高亮，只提示无法持久保存。

### 强制复用的资产

每次生成 HTML 时必须读取 teacher skill 目录中的以下文件：

- `assets/highlighter.css`
- `assets/highlighter-toolbar.html`
- `assets/highlighter.js`

使用方式：

1. 将 `assets/highlighter.css` 的完整内容内联到页面主 `<style>` 末尾，不得写成外部文件链接。
2. 将 `assets/highlighter-toolbar.html` 放在正文容器结束后、`<footer>` 前。
3. 将 `assets/highlighter.js` 的完整内容放入 `<script>...</script>`，置于 `</body>` 前。
4. 最终 HTML 必须仍是单文件，不依赖 teacher skill 目录中的运行时资源。
5. 不得随意改写高亮算法；若页面正文容器不是 `<main>` 或 `.container`，才允许调整脚本的根节点选择器。

### 高亮验收

- `#highlight-toolbar`、`#highlight-color`、`#highlight-apply`、`#highlight-remove`、`#highlight-clear` 均只出现一次。
- 页面含 `.user-highlight` 与 `.highlight-toolbar` 样式。
- 脚本含基于 `location.pathname` 的存储键和 `localStorage` 读写。
- 打印时隐藏工具栏，但保留高亮背景。
- 脚本通过 JavaScript 语法检查。

## 9. 交付前格式验收

除 `SKILL.md` 要求的内容与公式验收外，还必须确认：

1. 深青色 `<header>`、金色底线、暖白 `<main>` 均存在。
2. 桌面目录为双栏，宽度小于 700px 时变为单栏。
3. 每个大主题使用 `<section id="...">`，目录锚点能对应。
4. 中英文长句使用 `.pair` 紧邻配对，短标题使用 `.zh-inline`。
5. 定义、定理、例子、警告和证明使用正确组件。
6. 页面只有一个 `DOCTYPE`、一个 `<html>` 根节点。
7. HTML5 语义标签完整闭合。
8. 打印样式隐藏目录并去除正文阴影。
9. 高亮器三份标准资产已完整内联，并通过“高亮验收”。

## 10. 用户覆盖规则

若用户明确提供另一份参考 HTML 或明确要求改变风格：

1. 先说明将以用户本次提供的参考为准。
2. 内容完整性、中英文原子配对和公式安全规则不得取消。
3. 仅本次输出采用新风格；除非用户明确要求更新本文件，否则不要永久改写本格式规范。
