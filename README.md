# Documentation

```bash
git clone https://github.com/LibreTranslate/Documentation
cd Documentation
npm i
npm run dev 
```

* Open http://localhost:4321

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Translation

Localization for these docs is enabled. In order to add a new language, create a folder in `src/contents/docs/<langcode>` and copy the English versions of `index.mdx`, `guides` and `community` to it. Then add the language to `astro.config.mjs`:

```json
locales: {
    // ...
    it: {
        label: 'Italiano',
    },
},
```

## More Information

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build).
