This is the documentation repository of LibreTranslate, a free and open source translation API.

# Where to find contents

- `src/docs`: directory with documentation pages in mdx and markdown format

# Rules

- The tone of translation should be technical. The context of translation is that of software API.
- Never edit or commit any file in `src/content/docs/community` or `src/content/docs/guides` or `src/content/index.mdx`. These are the original English pages
- Always preserve images in the proper places.
- Each translation for other languages, like Italian or Spanish, needs to be added as subfolder in `src/content/docs/[langcode]`, where `langcode` is the 2 letter ISO 639 language code. For example, Italian docs go in `src/content/docs/it/`.
- Each translation must have an `index.mdx` and copies of each subfolder (`community`, `guides`) and a copy of each markdown file in each subfolder. Always verify that the number of pages match.
- Always create/update ALL the markdown files when asked to add or update a translation.
- Always translate from English, never from another language.
- Always verify all translations for accuracy and completeness in all markdown files, then fix all inaccuracies and fill any missing section, if any.
- When translating internal links, we always reference them with the appropriate URL that maps to a markdown file of the translation.
- Never modify any other file other than those in `src/content` or `astro.config.mjs` without explicit permission.
- When translating, always check that all the sidebar items in `astro.config.mjs` have a proper translation item in the `translations` key.

# How to build / check that the website builds

```bash
nvm use 22
npm run build
```

The outputs will be in `dist/`.

# Glossaries / Nuances

These words / sentences should be treated carefully:

## Machine

Should be interpreted as "computer" or "system" (not a literal machine).

E.g. in Spanish use "equipo" or "computadora", not "máquina".