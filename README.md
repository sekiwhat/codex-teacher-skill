# 🎓 Teacher Skill for Codex CLI

A skill for [Codex CLI](https://github.com/openai/codex) that transforms Markdown documents into beautifully designed, self-contained HTML teaching files — explained as if teaching a 5-year-old, but without sacrificing accuracy.

## What It Does

Feed it any Markdown file, and it will:

1. **Read the entire document** and identify every knowledge point, definition, formula, theorem, example, and proof
2. **Explain each concept** using simple language, real-life analogies, and step-by-step reasoning
3. **Generate a standalone HTML file** with KaTeX math rendering, responsive design, and a clean visual style

The output HTML is fully self-contained — no external dependencies needed (except KaTeX CDN for math).

## Features

- **Bilingual support**: English, Chinese, or side-by-side bilingual mode
- **Complete coverage**: Never skips any content — every formula, every proof, every example
- **Beautiful HTML output**: Card-based layout with color-coded categories (definitions, examples, proofs, warnings)
- **KaTeX math**: Full LaTeX math rendering with `$...$` and `$$...$$` syntax
- **Text highlighter**: Built-in highlight tool with custom colors, persistent via localStorage
- **Responsive & print-friendly**: Works on mobile and prints cleanly

## Installation

```bash
# Clone into your Codex skills directory
git clone https://github.com/YOUR_USERNAME/codex-teacher-skill.git ~/.codex/skills/teacher
```

Or copy the files manually:

```bash
cp -r teacher/ ~/.codex/skills/teacher
```

## Usage

In Codex CLI:

```
/teacher path/to/your/document.md
```

Or simply say:

> "教我这个文档" / "Explain this document to me"

The skill will ask you to choose a language mode (English / Chinese / Bilingual), then generate a `teaching_*.html` file in the same directory as the source Markdown.

## File Structure

```
teacher/
├── SKILL.md                  # Skill definition and instructions
├── HTML_FORMAT.md            # HTML template and design system
├── README.md                 # This file
└── assets/
    ├── highlighter.css       # Highlight tool styles
    ├── highlighter.js        # Highlight tool logic
    └── highlighter-toolbar.html  # Highlight toolbar HTML
```

## How It Works

The skill follows a structured workflow:

```
Confirm language → Read document → List knowledge points → [User confirms]
→ Explain each point → Build outline → [User confirms] → Generate HTML → Validate
```

Three checkpoints ensure the user stays in control:
- **Checkpoint 0**: Confirm output language
- **Checkpoint 1**: Review knowledge point list
- **Checkpoint 2**: Review HTML outline before generation

## Example

Given a Markdown file about probability theory, the generated HTML includes:

- A knowledge map overview
- Color-coded cards for definitions, examples, proofs, and warnings
- Fully rendered LaTeX formulas
- Step-by-step problem solving with explanations
- A summary section with core takeaways

## License

MIT
