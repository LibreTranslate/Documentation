This is the documentation repository of LibreTranslate, a free and open source translation API.

# Where to find contents

- `src/docs`: directory with documentation pages in mdx and markdown format

# Rules

- Never edit or commit any file in `src/content/docs/community` or `src/content/docs/guides` or `src/content/index.mdx`. These are the original English pages
- Each translation for other languages, like Italian or Spanish, needs to be added as subfolder in `src/content/docs/[langcode]`, where `langcode` is the 2 letter ISO 639 language code. For example, Italian docs go in `src/content/docs/it/`.
- Each translation must have an `index.mdx` and copies of each subfolder (`community`, `guides`) and a copy of each markdown file in each subfolder. Always verify that the number of pages match.
- When translating internal links, we always reference them with the appropriate URL that maps to a markdown file of the translation.
- Never modify any other file other than those in `src/content` without explicit permission.

# How to build / check that the website builds

```bash
nvm use 22
npm run build
```

The outputs will be in `dist/`.