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

使用精心编排、适合长篇阅读的”学术讲义”风格。设计语言围绕三个要点：清晰的层级、克制的色彩、有辨识度的排版。

### 色彩系统

| 角色 | 色值 | 用途 |
|---|---|---|
| 页面背景 | `#F2F0EB` | 暖灰底衬，减轻长时间阅读疲劳 |
| 正文纸张 | `#FEFCF8` | 暖白阅读区 |
| 封面背景 | `#1A2B3C` | 深海军蓝，比纯黑更柔和 |
| 封面强调线 | 渐变 `#B84A2A → #B8862D → #1B7A7A` | 三色渐变条 |
| 正文主色 | `#1F2937` | 近黑，柔和于纯黑 |
| 辅助文本 | `#6B7280` | 浅色注释 |
| 主强调色 | `#B84A2A` | 暖铜色——吸引注意但不过分 |
| 第二强调色 | `#1B7A7A` | 深青色——稳定、学术 |
| 代码背景 | `#1E293B` | 暗色代码块 |

知识框分色：

| 框类型 | 颜色 | 色值 |
|---|---|---|
| 定义 | 紫色 | `#6C5B8A` / `#F0ECF6` |
| 定理 | 青色 | `#1B7A7A` / `#E6F5F5` |
| 示例 | 金色 | `#B8862D` / `#FDF5E6` |
| 注意 | 红色 | `#A04545` / `#FDF0F0` |

### 排版

理解排版的使用场景：网课讲义的核心是清晰，但清晰的排版不意味着乏味。为了配合阅读体验并赋予页面一种”出版级”的质感：

- **展示/标题字体**：`Fraunces` — 一种带有”软”轴的衬线体，阅读时比通用无衬线字体更具个性和质感。用于英语标题和章节名称。权重范围 500–800。
- **正文字体**：`Inter` + `Noto Sans SC` — 干净的英文无衬线配合中文黑体，确保双语场景下的阅读舒适度。
- **等宽字体**：`JetBrains Mono` — 用于代码块和行内代码，有更好的连字设计。
- 所有字体从 Google Fonts 加载（通过 `<link>` 引入），页面保持单文件自包含。

### 知识框结构

每个定义、定理、示例、注意框使用**双行结构**：彩色标签头 + 浅色正文区，既能快速扫描内容类型，又比纯左侧色条更显精致。

```html
<div class=”box definition”>
  <div class=”box-head”>Definition <span class=”zh-inline”>定义</span></div>
  <div class=”box-body”>…</div>
</div>
```

### 布局

- 正文区最大宽度约 `900px`，居中显示
- 封面全宽，深色背景，底部为三色渐变强调线
- 每个大主题使用 `<section id=”...”>` 分隔
- 正文纸张有细微圆角（约 12px）和阴影，在浅色背景上形成卡片感
- 不依赖悬浮动画、夸张渐变或 emoji 装饰

### 中英文关系

- 英文与中文上下紧邻（英文在上，中文在下），不使用左右双栏
- 短标题和术语使用 `<span class=”zh-inline”>` 同行
- 长句和段落使用 `<p class=”pair”>` 上下配对

## 3. 必须使用的页面骨架

```html
<!doctype html>
<html lang=”[en 或 zh-CN]”>
<head>
  <meta charset=”utf-8”>
  <meta name=”viewport” content=”width=device-width, initial-scale=1”>
  <title>[English title] [中文标题]：教学讲解</title>
  <!-- KaTeX 资源与初始化 -->
  <link rel=”stylesheet” href=”https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css”>
  <script defer src=”https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js”></script>
  <script defer src=”https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js”></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    });
  </script>
  <!-- Google Fonts -->
  <link rel=”preconnect” href=”https://fonts.googleapis.com”>
  <link rel=”preconnect” href=”https://fonts.gstatic.com” crossorigin>
  <link href=”https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap” rel=”stylesheet”>
  <style>
    /* 使用本文件第 4 节的设计系统 */
  </style>
</head>
<body>
  <header>
    <div class=”wrap”>
      <div class=”eyebrow”>[Course · Lesson range · 中文课程信息]</div>
      <h1>[English title]<br>[中文标题]</h1>
      <p lang=”en”>[English one-sentence introduction]</p>
      <p lang=”zh-CN”>[中文一句话简介]</p>
    </div>
  </header>

  <main>
    <nav aria-label=”Table of contents”>
      <!-- 每个目录项中英文同行 -->
    </nav>

    <section id=”...”>
      <!-- 教学内容 -->
    </section>
  </main>

  <footer>[Course · Lesson range · Teaching Notes]</footer>
</body>
</html>
```

要求：

- 必须有独立 `<header>` 封面、`<main>` 正文和 `<footer>`。
- 封面标题使用 `Fraunces` 字号，展示字体风格。
- 目录紧接封面后的正文顶部。
- 每个大主题使用一个 `<section id=”...”>`。
- 不再使用”所有内容包在 `.container` 中并以大卡片堆叠”的旧版结构。

## 4. 标准 CSS 设计系统

以下样式是基线。可以添加内容所需的类，但不得删除核心变量、封面、正文、目录、中英文配对、知识框、表格、响应式和打印规则。

字体通过 Google Fonts 以 `<link>` 方式加载（见 3. 页面骨架），CSS 中直接引用 `font-family` 变量。

```css
:root {
  --page-bg:       #F2F0EB;
  --surface:       #FEFCF8;
  --ink:           #1F2937;
  --ink-soft:      #374151;
  --ink-muted:     #6B7280;
  --ink-faint:     #9CA3AF;

  --accent:        #B84A2A;
  --accent-soft:   #FDF0EA;
  --accent-line:   #E8C8B8;

  --teal:          #1B7A7A;
  --teal-soft:     #E6F5F5;
  --teal-line:     #B0D4D4;

  --gold:          #B8862D;
  --gold-soft:     #FDF5E6;
  --gold-line:     #E6D4B0;

  --violet:        #6C5B8A;
  --violet-soft:   #F0ECF6;
  --violet-line:   #D4C8E0;

  --red:           #A04545;
  --red-soft:      #FDF0F0;
  --red-line:      #E0B8B8;

  --code-bg:       #1E293B;
  --code-text:     #E2E8F0;

  --line:          #D4CDC0;
  --line-light:    #E5E0D6;

  --font-display:  'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body:     'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont,
                    'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
  --font-mono:     'JetBrains Mono', 'SFMono-Regular', Consolas,
                    'Liberation Mono', monospace;

  --radius-sm:    6px;
  --radius-md:    10px;
  --radius-lg:    14px;
  --shadow-sm:    0 1px 3px rgba(31, 41, 55, .06);
  --shadow-md:    0 4px 12px rgba(31, 41, 55, .08);
  --shadow-lg:    0 8px 28px rgba(31, 41, 55, .10);
}

/* ===== Reset & base ===== */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  color: var(--ink);
  background: var(--page-bg);
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.72;
  -webkit-font-smoothing: antialiased;
}

/* ===== Header ===== */
header {
  position: relative;
  background: linear-gradient(135deg, #1A2B3C 0%, #0F1E2B 100%);
  color: #fff;
  padding: 56px 24px 50px;
  overflow: hidden;
}
header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, var(--accent) 0%, var(--gold) 50%, var(--teal) 100%);
}
header .wrap {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.eyebrow {
  display: inline-block;
  font-size: .78rem;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: rgba(255,255,255,.65);
  border: 1px solid rgba(255,255,255,.15);
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 16px;
}
h1 {
  margin: 0 0 12px;
  max-width: 820px;
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 5vw, 3.6rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -.02em;
  color: #fff;
}
header p {
  margin: 0;
  max-width: 760px;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(255,255,255,.8);
}
header p[lang="zh-CN"] {
  margin-top: 6px;
  font-size: .97rem;
  color: rgba(255,255,255,.65);
}

/* ===== Main content area ===== */
main {
  max-width: 900px;
  margin: 28px auto;
  background: var(--surface);
  padding: 32px clamp(20px, 4vw, 48px) 60px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

/* ===== Table of contents ===== */
nav {
  border-bottom: 1px solid var(--line-light);
  padding-bottom: 24px;
  margin-bottom: 28px;
  columns: 2;
  column-gap: 32px;
}
nav a {
  display: block;
  color: var(--accent);
  text-decoration: none;
  padding: 4px 0;
  break-inside: avoid;
  font-size: .92rem;
}
nav a:hover { color: var(--accent-dark, #9A3E1F); text-decoration: underline; }
nav a span { display: inline; }
nav a .nav-zh {
  color: var(--ink-muted);
  margin-left: .25em;
  font-size: .9em;
}

/* ===== Section layout ===== */
section {
  padding: 28px 0;
  border-top: 1px solid var(--line-light);
}
section:first-of-type { border-top: 0; }

h2 {
  margin: 0 0 16px;
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 3vw, 2.05rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -.01em;
  color: #162D3A;
}
h2 .zh-inline {
  font-family: var(--font-body);
  font-weight: 400;
  color: var(--ink-muted);
  margin-left: .35em;
}
h3 {
  margin: 26px 0 8px;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: #1A2B3C;
}
h3 .zh-inline { margin-left: .25em; }

p { margin: 10px 0; }
ul, ol { padding-left: 24px; }
li { margin: 5px 0; }

/* ===== Boxes with label header ===== */
.box {
  margin: 18px 0;
  padding: 0;
  border-radius: var(--radius-md);
  overflow: hidden;
}
.box > :last-child { margin-bottom: 0; }

.box-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: .82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .04em;
}
.box-head .zh-inline {
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  opacity: .85;
}
.box-body {
  padding: 14px 16px 16px;
}
.box-body > :first-child { margin-top: 0; }
.box-body > :last-child { margin-bottom: 0; }

.definition { border: 1px solid var(--violet-line); }
.definition .box-head { background: var(--violet-soft); color: var(--violet); }
.definition .box-body { background: color-mix(in srgb, var(--violet-soft) 40%, white); }

.theorem { border: 1px solid var(--teal-line); }
.theorem .box-head { background: var(--teal-soft); color: #125C5C; }
.theorem .box-body { background: color-mix(in srgb, var(--teal-soft) 40%, white); }

.example { border: 1px solid var(--gold-line); }
.example .box-head { background: var(--gold-soft); color: #7A5A1A; }
.example .box-body { background: color-mix(in srgb, var(--gold-soft) 40%, white); }

.warning { border: 1px solid var(--red-line); }
.warning .box-head { background: var(--red-soft); color: var(--red); }
.warning .box-body { background: color-mix(in srgb, var(--red-soft) 40%, white); }

/* ===== Bilingual pair ===== */
.pair { margin: 10px 0; }
.pair > span { display: block; }
.pair > span[lang="zh-CN"] {
  margin-top: 3px;
  font-size: .96em;
  color: var(--ink-soft);
  line-height: 1.78;
}
.zh-inline {
  font-family: var(--font-body);
  color: #4A5B6B;
  font-weight: inherit;
}

/* ===== Step number badge ===== */
.step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-weight: 700;
  font-size: .78rem;
  margin-right: 7px;
  flex-shrink: 0;
}

/* ===== Tables ===== */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: .92rem;
}
th, td {
  border: 1px solid var(--line-light);
  padding: 8px 12px;
  text-align: left;
  vertical-align: top;
}
th {
  background: var(--accent-soft);
  font-weight: 600;
  font-size: .85rem;
  color: #8A3E1F;
}

/* ===== Code ===== */
pre {
  margin: 16px 0;
  padding: 18px 20px;
  overflow-x: auto;
  background: var(--code-bg);
  color: var(--code-text);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: .85rem;
  line-height: 1.55;
  tab-size: 2;
}
code { font-family: var(--font-mono); font-size: .88em; }
.inline-code {
  font-family: var(--font-mono);
  font-size: .85em;
  background: var(--accent-soft);
  color: #8A3E1F;
  padding: .1em .35em;
  border-radius: 4px;
}

/* ===== Math ===== */
.math-block { overflow-x: auto; padding: 5px 0; }

/* ===== Proof ===== */
.proof {
  border-left: 3px solid var(--line);
  padding-left: 18px;
  margin: 14px 0;
  color: var(--ink-soft);
  font-size: .94rem;
}
.proof::before {
  content: "Proof · 证明。";
  display: block;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 4px;
}

/* ===== Grid ===== */
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
  border-radius: var(--radius-sm);
}

/* ===== Footer ===== */
footer {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  color: var(--ink-muted);
  padding: 24px 16px 40px;
  font-size: .85rem;
}

/* ===== Responsive ===== */
@media (max-width: 700px) {
  header { padding: 38px 18px 42px; }
  main {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 20px 18px 40px;
  }
  nav { columns: 1; }
  .grid { grid-template-columns: 1fr; }
  .katex-display { font-size: .93em; }
}

/* ===== Print ===== */
@media print {
  body { background: white; }
  header {
    background: white !important;
    color: black !important;
    padding: 24px 0 20px;
  }
  header::after { display: none; }
  h1 { color: black !important; }
  .eyebrow { color: #555 !important; border-color: #ccc !important; }
  header p { color: #444 !important; }
  main {
    margin: 0;
    box-shadow: none;
    border-radius: 0;
    padding: 20px 0;
  }
  nav { display: none; }
  section { break-inside: avoid-page; }
  .box { break-inside: avoid; }
}

/* ===== Reduced motion ===== */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    transition-duration: 0s !important;
    animation-duration: 0s !important;
  }
}

/* 此处还必须内联 assets/highlighter.css 的完整内容。 */
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
| 普通直观解释 | `<div class="box"><div class="box-body">…</div></div>` |
| 定义 | `<div class="box definition"><div class="box-head">Definition <span class="zh-inline">定义</span></div><div class="box-body">…</div></div>` |
| 定理、结论、最终答案 | `<div class="box theorem"><div class="box-head">... <span class="zh-inline">...</span></div><div class="box-body">…</div></div>` |
| 生活例子、例题 | `<div class="box example"><div class="box-head">... <span class="zh-inline">...</span></div><div class="box-body">…</div></div>` |
| 易错点、概念辨析 | `<div class="box warning"><div class="box-head">... <span class="zh-inline">...</span></div><div class="box-body">…</div></div>` |
| 证明 | `<div class="proof">…</div>` |
| 并列小知识点 | `.grid` + `.mini` |
| 分步解题 | `.step` 编号 |
| 展示公式 | `.math-block` 内使用 `$$...$$` 或 `\[...\]` |
| 代码块 | `<pre><code>` 包裹，使用 `var(--font-mono)` |

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

## 7.1 源代码块转义安全

- `<pre><code>` 中的源码必须保留原始转义字符；例如 C 源码 `write(fd, "world\n", 6);` 必须在页面中仍显示反斜杠+n。
- 生成 HTML 时，禁止把含 `\n`、`\t`、`\\`、`\"` 等源码片段放进会解释转义序列的普通字符串字面量；使用原始字符串、双重转义，或从原文逐字读入后再做 HTML 转义。
- 交付前扫描所有源码 `<pre><code>`：字符串字面量内部不得出现真实换行。发现后必须修复并重新验证。

## 8. 强制文字高亮功能

每个 teacher HTML 默认必须带有可持久化的文字高亮器。除非用户明确要求移除，否则不可省略。

### 必须支持

- 鼠标或键盘选择正文文字后弹出浮动工具栏。
- 使用 `<input type="color">` 自定义任意高亮颜色。
- 点击已有高亮后可以修改颜色或删除。
- 提供“全部清除”按钮，并在清除前确认。
- 提供常驻高亮定位条，显示高亮数量，并支持跳转到上一个/下一个高亮；跳转时滚动到对应高亮并短暂突出显示当前位置。
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
- `#highlight-locator`、`#highlight-prev`、`#highlight-next`、`#highlight-count` 均只出现一次。
- 页面含 `.user-highlight`、`.highlight-toolbar`、`.highlight-locator` 与 `.user-highlight.is-located` 样式。
- 脚本含基于 `location.pathname` 的存储键和 `localStorage` 读写。
- 脚本含高亮定位逻辑：更新计数、上一个/下一个循环跳转、`scrollIntoView`、短暂添加并移除 `is-located` 类。
- 打印时隐藏工具栏和定位条，但保留高亮背景。
- 脚本通过 JavaScript 语法检查。

## 9. 交付前格式验收

除 `SKILL.md` 要求的内容与公式验收外，还必须确认：

1. 封面 `<header>` 使用深海军蓝渐变背景 `#1A2B3C → #0F1E2B`，底部有三色渐变强调线。
2. 正文 `<main>` 使用暖白背景 `#FEFCF8`，有细微圆角和阴影。
3. 桌面目录为双栏，宽度小于 700px 时变为单栏。
4. 每个大主题使用 `<section id=”...”>`，目录锚点能对应。
5. 中英文长句使用 `.pair` 紧邻配对，短标题使用 `.zh-inline`。
6. 定义、定理、例子、警告使用 `.box` + `.box-head` + `.box-body` 结构，证明使用 `.proof`。
7. 页面只有一个 `DOCTYPE`、一个 `<html>` 根节点。
8. HTML5 语义标签完整闭合。
9. 打印样式隐藏目录并去除正文阴影和背景色。
10. 支持 `prefers-reduced-motion`，关闭平滑滚动和动画。
11. 高亮器三份标准资产已完整内联，并通过”高亮验收”。
12. 源码 `<pre><code>` 通过转义验收：字符串字面量中的 `\n`、`\t`、`\\` 等没有被生成器解释成真实换行或其他字符。

## 10. 用户覆盖规则

若用户明确提供另一份参考 HTML 或明确要求改变风格：

1. 先说明将以用户本次提供的参考为准。
2. 内容完整性、中英文原子配对和公式安全规则不得取消。
3. 仅本次输出采用新风格；除非用户明确要求更新本文件，否则不要永久改写本格式规范。
