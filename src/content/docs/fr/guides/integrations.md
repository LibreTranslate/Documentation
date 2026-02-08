---
title: Intégrations
description: Découvrez les logiciels qui fonctionnent avec LibreTranslate.
---

De nombreux logiciels ont été intégrés avec LibreTranslate. Certains d'entre eux sont listés ci-dessous :

## Plugin Discourse

Vous pouvez utiliser le [plugin de traduction officiel discourse](https://github.com/discourse/discourse-translator) pour traduire les sujets [Discourse](https://discourse.org) avec LibreTranslate. Pour l'installer, modifiez simplement `/var/discourse/containers/app.yml` :

```yaml
## Plugins go here
## see https://meta.discourse.org/t/19157 for details
hooks:
  after_code:
    - exec:
        cd: $home/plugins
        cmd:
          - git clone https://github.com/discourse/docker_manager.git
          - git clone https://github.com/discourse/discourse-translator
    ...
```

Ensuite exécutez `./launcher rebuild app`. Depuis le panneau d'administration de Discourse, sélectionnez ensuite "LibreTranslate" comme fournisseur de traduction et définissez les configurations de endpoint pertinentes.

Voyez-le en action sur cette [page](https://community.libretranslate.com/t/have-you-considered-adding-the-libretranslate-discourse-translator-multilingual-to-this-forum/766).

## Applications mobiles

- [LibreTranslator](https://codeberg.org/BeoCode/LibreTranslator) est une application Android disponible [dans le magasin F-Droid](https://f-droid.org/packages/de.beowulf.libretranslater/) qui utilise l'API LibreTranslate.
- [Translate You](https://github.com/you-apps/TranslateYou) est une application de traduction axée sur la confidentialité construite avec MD3 disponible [dans le magasin F-Droid](https://f-droid.org/packages/com.bnyro.translate/) et utilise l'API LibreTranslate.
- [LiTranslate](https://github.com/viktorkalyniuk/LiTranslate-iOS) est une application iOS [disponible sur l'App Store](https://apps.apple.com/us/app/litranslate/id1644385339) qui utilise l'API LibreTranslate.

## Navigateur Web

- [LibreTranslate for Firefox](https://addons.mozilla.org/en-US/firefox/addon/libretranslate/) une extension Firefox pour traduire avec LibreTranslate
- [LibreTranslateClient for Firefox](https://addons.mozilla.org/en-US/firefox/addon/libretranslateclient/) une autre extension Firefox pour traduire avec LibreTranslate
- [minbrowser](https://minbrowser.org/) est un navigateur web avec [support LibreTranslate intégré](https://github.com/argosopentech/argos-translate/discussions/158#discussioncomment-1141551)
