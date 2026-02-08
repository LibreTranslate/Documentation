---
title: Integrazioni
description: Scopri i software che funzionano con LibreTranslate.
---

Molti pacchetti software sono stati integrati con LibreTranslate. Alcuni di essi sono elencati di seguito:

## Plugin per Discourse

Puoi utilizzare il [plugin traduttore ufficiale di Discourse](https://github.com/discourse/discourse-translator) per tradurre gli argomenti di [Discourse](https://discourse.org) con LibreTranslate. Per installarlo, modifica semplicemente `/var/discourse/containers/app.yml`:

```yaml
## I plugin vanno qui
## vedi https://meta.discourse.org/t/19157 per i dettagli
hooks:
  after_code:
    - exec:
        cd: $home/plugins
        cmd:
          - git clone https://github.com/discourse/docker_manager.git
          - git clone https://github.com/discourse/discourse-translator
    ...
```

Quindi esegui `./launcher rebuild app`. Dal pannello di amministrazione di Discourse, seleziona "LibreTranslate" come provider di traduzione e imposta la configurazione degli endpoint.

Guarda un esempio su questa [pagina](https://community.libretranslate.com/t/have-you-considered-adding-the-libretranslate-discourse-translator-multilingual-to-this-forum/766).

## App Mobili

- [LibreTranslator](https://codeberg.org/BeoCode/LibreTranslator) è un'app per Android disponibile [nello store F-Droid](https://f-droid.org/packages/de.beowulf.libretranslater/) che utilizza l'API di LibreTranslate.
- [Translate You](https://github.com/you-apps/TranslateYou) è un'app di traduzione incentrata sulla privacy, creata con Material Design 3, disponibile [nello store F-Droid](https://f-droid.org/packages/com.bnyro.translate/) e utilizza l'API di LibreTranslate tra gli altri provider.
- [LiTranslate](https://github.com/viktorkalyniuk/LiTranslate-iOS) è un'app per iOS [disponibile sull'App Store](https://apps.apple.com/us/app/litranslate/id1644385339) che utilizza l'API di LibreTranslate.

## Browser Web

- [LibreTranslate per Firefox](https://addons.mozilla.org/en-US/firefox/addon/libretranslate/) è un'estensione per Firefox per tradurre con LibreTranslate
- [LibreTranslateClient per Firefox](https://addons.mozilla.org/en-US/firefox/addon/libretranslateclient/) è un'altra estensione per Firefox per tradurre con LibreTranslate
- [minbrowser](https://minbrowser.org/) è un browser web con [supporto integrato per LibreTranslate](https://github.com/argosopentech/argos-translate/discussions/158#discussioncomment-1141551)
