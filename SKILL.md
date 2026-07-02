---
name: teacher
description: "教师技能：将 Markdown 文档中的所有知识，像教 5 岁小孩一样准确、深入浅出地讲解，并输出为精美的 HTML 文件。开始前主动确认使用英文、中文或中英文对照；中英文对照在同一个 HTML 中按最小内容单元紧邻配对，标题和术语中英同列，长句英文后立即接中文。使用场景：用户说「教我」「讲解」「说明」某个 md 文档，或使用 /teacher 命令。"
---

# Teacher Skill

> 将 Markdown 文档中的所有知识，像教 5 岁小孩一样准确、深入浅出地讲解。输出为精美的 HTML 文件，而非直接写在对话中。每次调用时先确认用户希望使用英文、中文还是中英文对照。

## 强制格式参考

- 每次调用本 skill 时，在创建或修改教学 HTML 前，必须完整读取同目录下的 [`HTML_FORMAT.md`](HTML_FORMAT.md)。
- 每次生成 HTML 时，还必须读取并内联 `assets/highlighter.css`、`assets/highlighter-toolbar.html`、`assets/highlighter.js`，为页面提供自定义颜色、可持久保存的文字高亮功能。
- `HTML_FORMAT.md` 是默认 HTML 视觉格式、页面骨架、CSS 组件和排版规则的唯一格式源。
- 除非用户本次明确指定另一种参考格式，否则必须按 `HTML_FORMAT.md` 创建 HTML。
- 若 `HTML_FORMAT.md` 与本文件内旧版 HTML 模板存在冲突，格式相关要求以 `HTML_FORMAT.md` 为准；内容完整性、语言配对和公式安全要求仍以本文件为准。

---

## 触发条件

当用户出现以下任一情况时激活本 skill：
- 使用 `/teacher` 命令
- 说"教我"、"讲解"、"说明"某个 md 文档
- 提供一个 md 文件并希望系统性地讲解其中知识

---

## 核心原则

### 1. 绝不省略

文档中的**每一个**知识点、定义、公式、定理、例题、证明，都必须覆盖。漏掉任何一个知识点都是失职。

**反例（不要这样做）**：
- ❌ "这部分比较简单，就不展开了"
- ❌ "相信大家都能理解，跳过"
- ❌ "这个公式很直观，不用多解释"

### 2. 深入浅出

- 用最简单的语言解释复杂概念
- 多用生活中的类比和比喻
- 先讲"是什么"，再讲"为什么"，最后讲"怎么用"
- 每个抽象概念都要配一个具体的例子

### 3. 结构清晰

- 按照原文档的逻辑顺序讲解
- 每个章节/主题用清晰的标题分隔
- 重要的定义、公式、定理用醒目的格式标注

### 4. 教学元素完备

以下每一项都不能少：

| 元素 | 要求 |
|------|------|
| **定义** | 用自己的话重新解释，加上通俗理解 |
| **例子** | 每个概念至少 1-2 个贴近生活的例子 |
| **例题** | 完整展示解题步骤，每一步都解释"为什么这样做" |
| **证明** | 如果文档中有证明，逐步讲解，解释每一步的逻辑 |
| **对比/区别** | 容易混淆的概念要明确对比 |
| **总结** | 每个大主题结束后做小结 |

### 5. 语言风格

- 像跟小朋友聊天一样亲切
- 如果用户在本次请求中尚未明确指定语言，必须先询问："教学 HTML 希望使用英文、中文，还是中英文对照？"
- 英文模式：全部教学内容使用英文
- 中文模式：全部教学内容使用中文
- 中英文对照模式：只生成一个 HTML 文件，并按**最小内容单元**紧邻配对。标题、术语、短标签使用 `English 中文` 同行形式，例如 `Why Probability Matters 为什么要学习概率`、`Games 游戏`；较长句子或段落使用英文在上、对应中文紧接下一行。每个列表项、表格单元、例题步骤和证明步骤也必须各自立即配对。
- 禁止按章节、卡片或大段落设置完整英文区后再设置完整中文区；禁止使用 `ENGLISH` / `中文` 两个语言大板块。
- 多用"你想想看"、"就好像"、"打个比方"这样的引导语
- 遇到公式时，先用文字描述含义，再写出公式
- 遇到符号时，逐个解释每个符号代表什么

---

## 执行流程

```
🔴 CHECKPOINT 0：确认输出语言（英文 / 中文 / 中英文对照）
    ↓
第一步：通读全文
    ↓
第二步：识别所有知识点
    ↓
🔴 CHECKPOINT 1：展示知识点清单，等用户确认
    ↓
第三步：逐一讲解
    ↓
第四步：串联总结
    ↓
🔴 CHECKPOINT 2：展示大纲结构，等用户确认
    ↓
第五步：输出 HTML 文件
    ↓
第六步：强制验证公式与 HTML 结构
```

### 详细步骤

0. **🔴 CHECKPOINT 0：确认语言** — 检查用户在本次请求中是否已经明确指定英文、中文或中英文对照。若未指定，立即询问："教学 HTML 希望使用英文、中文，还是中英文对照？" 并等待用户回答后再读取和处理文档。不得依据用户的界面语言、文档语言或历史调用自行推断。若用户已经明确指定，则不重复询问。
1. **通读全文** — 使用 Read 工具完整阅读整个文档，理解全貌和结构
2. **识别知识点** — 列出文档中涉及的所有概念、定义、定理、公式、例题、证明
3. **🔴 CHECKPOINT 1** — 将识别出的知识点清单展示给用户，询问："以上是本文档涉及的 N 个知识点，是否完整？需要补充或调整吗？" 等用户确认后再继续
4. **逐一讲解** — 按照文档顺序，对每个知识点进行详尽讲解，并严格使用 CHECKPOINT 0 确认的语言模式
5. **串联总结** — 最后给出整体的知识脉络总结
6. **🔴 CHECKPOINT 2** — 展示 HTML 大纲结构（目录+各章节标题），询问："将按此结构生成 HTML，是否需要调整？" 等用户确认后再继续
7. **读取格式并输出 HTML** — 再次确认已完整读取同目录的 `HTML_FORMAT.md` 和三份 `assets/highlighter.*` 标准资产，按其中的页面骨架、设计系统和组件映射，将教学内容与高亮器完整内联到一个 HTML 文件；中英文对照模式仍只输出一个文件
8. **强制验证** — 写入后扫描全部公式、HTML 结构和高亮器资产；验证失败必须修复并重新检查，不得直接交付

---

## 输出规范

### 格式文件优先级

- 开始生成 HTML 前必须读取同目录的 `HTML_FORMAT.md`。
- 页面封面、正文容器、目录、章节、知识框、配色、中英文 CSS、响应式和打印样式统一以 `HTML_FORMAT.md` 为准。
- 所有新生成的教学 HTML 默认必须包含 `HTML_FORMAT.md` 规定的自定义颜色高亮器，并完整内联三份 `assets/highlighter.*` 标准资产。
- 下方内嵌模板仅作为旧版兼容说明；与 `HTML_FORMAT.md` 冲突时不得采用。

### 文件命名与位置

- **文件名**：`teaching_[原文件名].html`
  - 例如：原文件 `chapter1.md` → 输出 `teaching_chapter1.html`
- **位置**：默认输出到当前项目文件夹/工作区根目录（即本次 Codex 运行的 `cwd`，例如 `/Users/qhs/2026Spring/OPSYS`），不要默认写入原 md 文件同目录。
- **用户指定优先**：若用户本次明确指定输出目录或完整输出路径，则按用户指定位置写入；若无法确定项目根目录或没有写入权限，先询问用户确认输出位置。

### HTML 语言模式

- 英文模式：使用 `<html lang="en">`
- 中文模式：使用 `<html lang="zh-CN">`
- 中英文对照模式：使用 `<html lang="zh-CN">`，按内容粒度选择以下两种结构：

```html
<!-- 标题、术语或短标签：中英同行 -->
<h2>
    Why Probability Matters
    <span lang="zh-CN">为什么要学习概率</span>
</h2>
<strong>
    Games
    <span lang="zh-CN">游戏</span>
</strong>

<!-- 长句或段落：英文后立即接中文 -->
<p class="bilingual-pair">
    <span lang="en">Probability is the mathematics of uncertainty.</span>
    <span lang="zh-CN">概率是研究不确定性的数学。</span>
</p>
```

- 把标题、术语和短标签视为一个原子单元，英文与中文放在同一行或同一元素内。
- 把长句、段落、列表项、表格单元、例题步骤和证明步骤视为独立原子单元；每个英文原子单元后必须立即出现对应中文，不得等到整段或整节结束后再翻译。
- 数学公式若两种语言共用且完全相同，只展示一次；公式前后的文字解释仍按原子单元紧邻配对。
- 不要使用上边框、大间距或语言标签把两种语言视觉上分成大板块，也不要拆成左右栏。

### 离线与降级方案

- **有网络**：使用 KaTeX CDN 渲染数学公式（推荐）
- **无网络/CDN 不可用**：移除 KaTeX 引用，公式用 `<code>` 标签包裹为纯文本，并在页面顶部提示"公式以纯文本形式展示"
- **检测方式**：生成 HTML 时始终包含 KaTeX CDN 引用；若用户反馈公式未渲染，提供降级版本

### 公式与结构验收

- KaTeX `delimiters` 必须同时包含 `$$...$$`、`$...$`、`\(...\)`、`\[...\]`，并与正文实际定界符一致。
- `.math-block` 中的展示公式必须使用 `$$...$$` 或 `\[...\]`；生成后扫描全部 `.math-block`，不得残留单美元展示公式。
- 若用 JavaScript `String.replace` 生成含 `$` 的 HTML，必须使用函数替换器或正确转义；替换字符串中的 `$$`、`$&`、`$'` 等具有特殊语义，禁止未经验证直接写入。
- 确认文件只有一个 `<!DOCTYPE html>`、一个 `<html>` 根节点和一个 `</html>`，不得重复拼接整份文档。
- 检查标签闭合、公式中的 `<`/`>` 转义以及 KaTeX 初始化脚本完整。浏览器可用时刷新并确认目标公式生成 `.katex` 或 `.katex-display`；不可用时至少完成静态扫描。

### HTML 模板

生成的 HTML 必须包含以下完整模板：

```html
<!DOCTYPE html>
<html lang="[根据语言模式使用 en 或 zh-CN]">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📖 [文档标题] — 教学讲解</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
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
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", sans-serif;
            line-height: 1.8;
            color: #2c3e50;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
            min-height: 100vh;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        h1 {
            font-size: 2.2em;
            color: #1a5276;
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #3498db;
        }
        h2 {
            font-size: 1.6em;
            color: #2980b9;
            margin-top: 50px;
            margin-bottom: 20px;
            padding-left: 15px;
            border-left: 5px solid #3498db;
        }
        h3 {
            font-size: 1.3em;
            color: #8e44ad;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        h4 {
            font-size: 1.1em;
            color: #27ae60;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        p { margin-bottom: 15px; }
        strong { color: #e74c3c; }
        em { color: #f39c12; font-style: normal; font-weight: bold; }
        .card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        .card:hover { transform: translateY(-2px); }
        .definition {
            background: linear-gradient(135deg, #e8f4f8 0%, #d5e8f0 100%);
            border-left: 5px solid #3498db;
        }
        .example {
            background: linear-gradient(135deg, #fef9e7 0%, #fdf2d1 100%);
            border-left: 5px solid #f1c40f;
        }
        .exercise {
            background: linear-gradient(135deg, #f0f9f0 0%, #dff0d8 100%);
            border-left: 5px solid #27ae60;
        }
        .proof {
            background: linear-gradient(135deg, #fdf2f8 0%, #f5d5e8 100%);
            border-left: 5px solid #e91e63;
        }
        .warning {
            background: linear-gradient(135deg, #fef5e7 0%, #fdebd0 100%);
            border-left: 5px solid #f39c12;
        }
        .summary {
            background: linear-gradient(135deg, #e8f8f5 0%, #d1f2eb 100%);
            border-left: 5px solid #1abc9c;
        }
        .tag {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 15px;
            font-size: 0.85em;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .tag-definition { background: #3498db; color: white; } .tag-example { background: #f1c40f; color: #333; }
        .tag-exercise { background: #27ae60; color: white; } .tag-proof { background: #e91e63; color: white; } .tag-warning { background: #f39c12; color: white; }
        pre {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 15px 0;
        }
        code { font-family: "Fira Code", "Consolas", monospace; }
        p code, li code {
            background: #e8e8e8;
            padding: 2px 6px;
            border-radius: 4px;
            color: #e74c3c;
        }
        ul, ol { margin: 10px 0 10px 25px; }
        li { margin-bottom: 8px; }
        .knowledge-map {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .knowledge-map ul { list-style: none; margin-left: 0; }
        .knowledge-map li::before { content: "📍 "; }
        .formula {
            text-align: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            margin: 15px 0;
            font-size: 1.1em;
        }
        hr {
            border: none;
            height: 2px;
            background: linear-gradient(to right, transparent, #3498db, transparent);
            margin: 40px 0;
        }
        .toc {
            background: white;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .toc h2 { border-left: none; padding-left: 0; text-align: center; }
        .toc ol { margin-left: 20px; }
        .toc a { color: #2980b9; text-decoration: none; }
        .toc a:hover { text-decoration: underline; }
        @media (max-width: 768px) {
            .container { padding: 20px 15px; }
            h1 { font-size: 1.8em; }
            h2 { font-size: 1.4em; }
            .card { padding: 15px; }
        }
        @media print {
            body { background: white; }
            .card { box-shadow: none; border: 1px solid #ddd; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 教学内容写在这里 -->
    </div>
</body>
</html>
```

### 内容结构

在 `<div class="container">` 内按以下结构组织：

```html
<h1>📖 [文档标题] — 教学讲解</h1>

<!-- 目录 -->
<div class="toc">
    <h2>📑 目录</h2>
    <ol>
        <li><a href="#map">🗺️ 知识地图</a></li>
        <li><a href="#part1">第一部分：[主题名]</a></li>
        <!-- 更多章节 -->
        <li><a href="#summary">🎯 全文总结</a></li>
    </ol>
</div>

<!-- 知识地图 -->
<div class="knowledge-map" id="map">
    <h2>🗺️ 知识地图</h2>
    <ul>
        <li>知识点 1：xxx</li>
        <li>知识点 2：xxx</li>
    </ul>
</div>

<hr>

<!-- 各部分内容 -->
<h2 id="part1">第一部分：[主题名]</h2>

<div class="card definition">
    <span class="tag tag-definition">📌 定义</span>
    <h3>[概念名]</h3>
    <h4>这是什么？</h4>
    <p>通俗易懂的解释...</p>
    <h4>为什么要学它？</h4>
    <p>动机和意义...</p>
</div>

<div class="card example">
    <span class="tag tag-example">🌰 例子</span>
    <h4>举个例子</h4>
    <p>贴近生活的例子...</p>
</div>

<div class="card exercise">
    <span class="tag tag-exercise">✏️ 例题</span>
    <h4>来做道题</h4>
    <p>题目描述...</p>
    <p><strong>解题步骤：</strong></p>
    <ol>
        <li>第一步：xxx（因为...）</li>
        <li>第二步：xxx（因为...）</li>
    </ol>
</div>

<div class="card proof">
    <span class="tag tag-proof">📐 证明</span>
    <h4>证明过程</h4>
    <p>逐步讲解...</p>
</div>

<div class="card warning">
    <span class="tag tag-warning">⚠️ 注意</span>
    <h4>容易搞混的地方</h4>
    <p>对比辨析...</p>
</div>

<hr>

<!-- 总结 -->
<div class="card summary" id="summary">
    <h2>🎯 全文总结</h2>
    <h3>知识脉络回顾</h3>
    <p>...</p>
    <h3>核心要点清单</h3>
    <ul>
        <li>要点 1</li>
        <li>要点 2</li>
    </ul>
</div>
```

---

## 完成后操作

1. 使用 Write 工具将完整 HTML 写入文件
2. 执行“公式与结构验收”，确认所有检查通过
3. 在对话中告知用户：
   - ✅ 教学文件已生成
   - 📁 文件路径
   - 💡 提示用户可以在浏览器中打开查看
3. 给出简短的内容概要（不超过 5 行），让用户知道覆盖了哪些知识点

---

## 异常与边界条件

| 场景 | 触发条件 | 一线修复 | 仍失败兜底 |
|------|----------|----------|------------|
| 文件不存在 | Read 工具返回错误 | 提示用户："文件 xxx 未找到，请检查路径后重新指定" | 终止执行，不生成空 HTML |
| 用户未指定文件 | 命令后无文件路径 | 询问用户："请提供要讲解的 md 文件路径" | 等待用户输入，不自动猜测 |
| 用户未指定语言 | 本次请求未明确英文、中文或中英文对照 | 在读取文档前询问用户选择三种语言模式之一 | 等待用户输入，不采用默认语言 |
| 文件过大（>500行） | Read 后发现行数超限 | 询问用户："文件较大（N行），是否分章节生成多个 HTML？" | 用户选"否"则一次性生成；用户选"是"则按原文档一级标题拆分 |
| 文件内容为空 | Read 返回空内容 | 提示用户："文件内容为空，请检查文件" | 终止执行 |
| KaTeX CDN 不可用 | 无网络环境 | 移除 KaTeX 引用，改用纯文本展示公式（用 `code` 标签包裹） | 告知用户公式将以纯文本形式展示 |
| 文档无知识点 | 识别阶段发现无实质内容 | 提示用户："文档中未发现可讲解的知识点" | 生成简版 HTML，仅包含原文摘要 |
| 公式渲染失败 | 公式含 `<`、`>` 等 HTML 特殊字符 | **生成 HTML 时**将公式中的 `<` 转义为 `&lt;`、`>` 转义为 `&gt;`；切勿用运行时 JS 处理 DOM text node（nodeValue 赋值不会触发 HTML 解析，KaTeX 会收到字面的 `&lt;` 而非 `<`） | 逐行检查公式，确保所有 HTML 特殊字符已转义 |
| 定界符未渲染 | 正文定界符不在 KaTeX `delimiters` 中 | 统一展示公式为 `$$...$$`，并补齐四类定界符配置 | 扫描所有公式容器，确认无不受支持的定界符 |
| HTML 被重复拼接 | 脚本替换误用 `$` 特殊替换语义 | 保留第一份完整文档，改用函数替换器重新生成 | 检查 `DOCTYPE`、`<html>`、`</html>` 均只出现一次 |

---

## 重要约束

### 必须做

- ✅ 覆盖文档中**每一个**知识点
- ✅ 每次生成或重做 HTML 前完整读取同目录的 `HTML_FORMAT.md`，并默认严格采用其格式
- ✅ 每次生成 HTML 时内联标准高亮器，支持自定义颜色、修改、删除、全部清除和 `localStorage` 持久保存
- ✅ 每次调用先确认英文、中文或中英文对照；仅当用户本次请求已明确指定时跳过询问
- ✅ 中英文对照只生成一个 HTML，并按最小内容单元紧邻配对：短内容中英同行，长内容英文后立即接中文
- ✅ 每个概念都配生活例子
- ✅ 每道例题都完整展示解题步骤
- ✅ 数学公式使用 KaTeX 语法（行内 `$...$`，独立 `$$...$$`）
- ✅ 交付前验证所有公式定界符受 KaTeX 配置支持，且 HTML 只有一个完整文档
- ✅ **公式中的 `<` 和 `>` 必须转义为 `&lt;` 和 `&gt;`**（HTML 源码层面）。浏览器 HTML 解析器会把裸 `<` 当作标签开头吞掉后续内容，导致公式被截断、KaTeX 渲染失败。例如 `$i<j$` 必须写成 `$i&lt;j$`，`$0<x<1$` 必须写成 `$0&lt;x&lt;1$`。这是**生成时**在 HTML 源码中转义，不是运行时 JS 处理。
- ✅ 代码逐行解释，使用 `<pre><code>` 包裹
- ✅ HTML 必须完整、可独立运行，不依赖本地资源

### 绝对不能做

- ❌ 跳过任何内容，即使是"简单"或"显然"的部分
- ❌ 在用户未明确选择时默认使用某种语言
- ❌ 将中英文对照拆成两个文件、两个页面，或任何英文大板块与中文大板块
- ❌ 先完成整个标题、卡片、章节或证明的英文内容，再集中提供对应中文
- ❌ 用"这部分比较简单，就不展开了"敷衍
- ❌ 用"相信大家都能理解"跳过讲解
- ❌ 省略公式中符号的含义解释
- ❌ 例题只给答案不给过程
- ❌ 在 HTML 源码的公式中写裸 `<` 或 `>`（必须转义为 `&lt;` / `&gt;`）

---

## 反例与黑名单

以下情况必须避免：

| 错误做法 | 正确做法 |
|----------|----------|
| "这个公式很直观" | 解释公式每个部分的含义 |
| "简单推导可得" | 展示完整推导过程 |
| "同理可证" | 详细讲解每一步 |
| "显然" | 解释为什么是显然的 |
| 直接在对话框输出 | 生成 HTML 文件 |
