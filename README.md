# Teacher Skill

Transforms Markdown documents into beautifully designed, self-contained HTML teaching files, explained simply without sacrificing accuracy.

## What It Does

Feed it any Markdown file, and it will:

1. Read the entire document and identify every knowledge point, definition, formula, theorem, example, proof, and code fragment.
2. Explain each concept using simple language, real-life analogies, and step-by-step reasoning.
3. Generate a standalone HTML file with KaTeX math rendering, responsive design, and a built-in persistent text highlighter.

## Features

- Bilingual support: English, Chinese, or tightly paired bilingual mode.
- Complete coverage: every formula, proof, example, code fragment, and important conclusion must be covered.
- Beautiful HTML output driven by `HTML_FORMAT.md`.
- KaTeX math rendering with explicit validation rules.
- Text highlighter with custom colors and `localStorage` persistence.
- Responsive and print-friendly output.

## Installation

Clone the repository into your agent's skills directory:

```bash
# Codex CLI
git clone https://github.com/sekiwhat/codex-teacher-skill.git ~/.codex/skills/teacher

# Claude Code
git clone https://github.com/sekiwhat/codex-teacher-skill.git ~/.claude/skills/teacher
```

Or copy the files manually:

```bash
cp -r teacher/ ~/.claude/skills/teacher
```

## Usage

In any skills-compatible agent runtime:

```text
/teacher path/to/your/document.md
```

Or simply say:

```text
教我这个文档
Explain this document to me
```

The skill asks for a language mode unless the current request already specifies English, Chinese, or bilingual output. By default it writes `teaching_[source-name].html` to the current working directory, unless the user specifies another output path.

## File Structure

```text
teacher/
├── SKILL.md
├── HTML_FORMAT.md
├── references/
│   ├── workflow.md
│   ├── pedagogy.md
│   ├── language-modes.md
│   ├── html-output.md
│   ├── validation.md
│   └── edge-cases.md
├── README.md
└── assets/
    ├── highlighter.css
    ├── highlighter.js
    └── highlighter-toolbar.html
```

## How It Works

```text
Confirm language -> Read required references -> Read document -> List knowledge points -> User confirms
-> Build teaching content -> Show outline -> User confirms -> Read HTML format/assets -> Generate HTML -> Validate
```

The `SKILL.md` file is intentionally small. Detailed rules live in `references/` so language behavior, teaching behavior, HTML output, validation, and edge cases can evolve independently.

## License

MIT
