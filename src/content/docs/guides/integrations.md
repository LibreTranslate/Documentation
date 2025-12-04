---
title: Integrations
description: Discover software that works with LibreTranslate.
---

Many software packages have been integrated with LibreTranslate. Some of them are listed below:

## Discourse Plugin

You can use the [official discourse translator plugin](https://github.com/discourse/discourse-translator) to translate [Discourse](https://discourse.org) topics with LibreTranslate. To install it simply modify `/var/discourse/containers/app.yml`:

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

Then issue `./launcher rebuild app`. From the Discourse's admin panel then select "LibreTranslate" as a translation provider and set the relevant endpoint configurations.

See it in action on this [page](https://community.libretranslate.com/t/have-you-considered-adding-the-libretranslate-discourse-translator-multilingual-to-this-forum/766).

## Mobile Apps

- [LibreTranslator](https://codeberg.org/BeoCode/LibreTranslator) is an Android app available [in the F-Droid store](https://f-droid.org/packages/de.beowulf.libretranslater/) that uses the LibreTranslate API.
- [Translate You](https://github.com/you-apps/TranslateYou) is a privacy focused translator app built with MD3 available [in F-Droid Store](https://f-droid.org/packages/com.bnyro.translate/) and uses the LibreTranslate API amongst other providers.
- [LiTranslate](https://github.com/viktorkalyniuk/LiTranslate-iOS) is an iOS app [available on the App Store](https://apps.apple.com/us/app/litranslate/id1644385339) that uses the LibreTranslate API.

## Web browser

- [LibreTranslate for Firefox](https://addons.mozilla.org/en-US/firefox/addon/libretranslate/) a Firefox extension for translating with LibreTranslate
- [minbrowser](https://minbrowser.org/) is a web browser with [integrated LibreTranslate support](https://github.com/argosopentech/argos-translate/discussions/158#discussioncomment-1141551)