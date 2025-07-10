---
title: Contributing
description: How to contribute to LibreTranslate.
---

We welcome contributions! Here's some ways to contribute to the project:

## Financially

You can support the project financially by getting yourself an [API key](https://portal.libretranslate.com) and/or support upstream libraries like [argos-translate](https://github.com/argosopentech/argos-translate) by visiting their [sponsorship page](https://github.com/sponsors/argosopentech).

## In-Kind

### Documentation

You can help us improve this [documentation](https://github.com/LibreTranslate/Documentation) or [translate it](https://github.com/LibreTranslate/Documentation/#translation).

### Web UI

The LibreTranslate [Web UI](https://libretranslate.com) is available in all the languages for which LibreTranslate can translate to. It can also (roughly) [translate itself!](https://github.com/LibreTranslate/LibreTranslate/blob/main/scripts/update_locales.py) Some languages might not appear in the UI since they haven't been reviewed by a human yet. You can enable all languages by turning on `--debug` mode.

You can help us improve or review the UI translations:

- Go to <https://hosted.weblate.org/projects/libretranslate/app/#translations>. All changes are automatically pushed to the repository.
- Once all strings have been reviewed/edited, open a pull request and change `libretranslate/locales/{code}/meta.json` or let us know in the [community forum](https://community.libretranslate.com) which language you've reviewed and we'll do it for you:

```json
{
 "name": "<Language>",
 "reviewed": true <-- Change this from false to true
}
```

### Developer Tasks

- You can train a new language model using [Locomotive](https://github.com/LibreTranslate/Locomotive). For example, we want to train improved neural networks for [German](https://community.libretranslate.com/t/help-wanted-improve-en-de-translation/935) and many other languages.
- Can you beat the performance of our language models? Train a new one and let's compare it. To submit your model make a post on the [community forum](https://community.libretranslate.com/) with a link to download your .argosmodel file and some sample text that your model has translated.
- Help us fix an existing [issue](https://github.com/LibreTranslate/LibreTranslate/issues).
- Add a new feature that is useful to you. If you're unsure about it, open a discussion on our [community forum](https://community.libretranslate.com/) first.


