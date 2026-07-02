---
name: teacher
description: "将 Markdown 文档转化为精美教学 HTML，像教 5 岁小孩一样深入浅出讲解。触发词：/teacher、教我、讲解、说明。支持英文/中文/中英文对照三种模式。"
---

# Teacher Skill

将 Markdown 文档中的所有知识，像教 5 岁小孩一样准确、深入浅出地讲解。输出为精美、可独立打开的 HTML 文件，而不是直接把完整课程写在对话中。

## 触发条件

当用户出现以下任一情况时激活本 skill：
- 使用 `/teacher` 命令
- 说“教我”、“讲解”、“说明”某个 Markdown 文档
- 提供一个 `.md` 文件并希望系统性地讲解其中知识

## 必读文件

本 skill 采用分层 Markdown 协作。按阶段读取，不要把规则凭记忆补全：

1. 启动后先读：
   - [`references/language-modes.md`](references/language-modes.md)：语言确认与中英文对照规则
   - [`references/pedagogy.md`](references/pedagogy.md)：讲解深度、知识覆盖和教学元素
   - [`references/workflow.md`](references/workflow.md)：检查点和执行流程
2. 准备生成 HTML 前再读：
   - [`HTML_FORMAT.md`](HTML_FORMAT.md)：唯一默认视觉格式、页面骨架、CSS 组件和排版规则
   - [`references/html-output.md`](references/html-output.md)：输出位置、HTML 语言模式、离线降级和结构映射
   - [`references/validation.md`](references/validation.md)：公式、HTML 结构、高亮器和源码代码块验收
   - `assets/highlighter.css`、`assets/highlighter-toolbar.html`、`assets/highlighter.js`：必须完整内联到最终 HTML
3. 遇到异常或边界条件时读：
   - [`references/edge-cases.md`](references/edge-cases.md)：文件、语言、超大文档、公式和拼接失败等处理规则

## 总流程

```text
CHECKPOINT 0：确认输出语言（英文 / 中文 / 中英文对照）
    ↓
通读全文
    ↓
识别所有知识点
    ↓
CHECKPOINT 1：展示知识点清单，等用户确认
    ↓
逐一讲解并组织课程内容
    ↓
串联总结
    ↓
CHECKPOINT 2：展示 HTML 大纲结构，等用户确认
    ↓
读取格式规则和高亮器资产，输出 HTML 文件
    ↓
强制验证公式、HTML 结构、高亮器资产和源码代码块
```

## 不可违反的底线

- 覆盖文档中每一个知识点、定义、公式、定理、例题、证明和代码片段。
- 如果用户本次请求没有明确指定英文、中文或中英文对照，必须先询问并等待回答。
- 中英文对照只生成一个 HTML，并按最小内容单元紧邻配对；禁止英文大板块后接中文大板块。
- 每个抽象概念都要配具体例子；每道例题都要展示完整步骤和每一步的原因。
- 生成或重做 HTML 前必须重新读取 `HTML_FORMAT.md` 和三份高亮器资产。
- HTML 必须完整、可独立运行；默认输出到本次 Codex 运行的 `cwd`，除非用户明确指定其他位置。
- 交付前必须完成 `references/validation.md` 中的全部验收；验证失败必须修复并重新检查。

## 交付回复

HTML 生成并验收通过后，在对话中只给用户：
- 教学文件已生成
- 绝对文件路径
- 浏览器打开提示
- 不超过 5 行的内容覆盖概要
