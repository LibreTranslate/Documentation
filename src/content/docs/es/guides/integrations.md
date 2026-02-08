---
title: Integraciones
description: Descubre el software que funciona con LibreTranslate.
---

Muchos paquetes de software se han integrado con LibreTranslate. Algunos de ellos se enumeran a continuación:

## Plugin para Discourse

Puedes usar el [plugin de traductor oficial de Discourse](https://github.com/discourse/discourse-translator) para traducir los temas de [Discourse](https://discourse.org) con LibreTranslate. Para instalarlo, simplemente modifica `/var/discourse/containers/app.yml`:

```yaml
## Los plugins van aquí
## consulta https://meta.discourse.org/t/19157 para más detalles
hooks:
  after_code:
    - exec:
        cd: $home/plugins
        cmd:
          - git clone https://github.com/discourse/docker_manager.git
          - git clone https://github.com/discourse/discourse-translator
    ...
```

Luego ejecuta `./launcher rebuild app`. Desde el panel de administración de Discourse, selecciona "LibreTranslate" como proveedor de traducción y establece la configuración de los puntos finales.

Mira un ejemplo en esta [página](https://community.libretranslate.com/t/have-you-considered-adding-the-libretranslate-discourse-translator-multilingual-to-this-forum/766).

## Aplicaciones Móviles

- [LibreTranslator](https://codeberg.org/BeoCode/LibreTranslator) es una aplicación para Android disponible [en la tienda F-Droid](https://f-droid.org/packages/de.beowulf.libretranslater/) que utiliza la API de LibreTranslate.
- [Translate You](https://github.com/you-apps/TranslateYou) es una aplicación de traducción centrada en la privacidad, creada con Material Design 3, disponible [en la tienda F-Droid](https://f-droid.org/packages/com.bnyro.translate/) y utiliza la API de LibreTranslate entre otros proveedores.
- [LiTranslate](https://github.com/viktorkalyniuk/LiTranslate-iOS) es una aplicación para iOS [disponible en la App Store](https://apps.apple.com/us/app/litranslate/id1644385339) que utiliza la API de LibreTranslate.

## Navegadores Web

- [LibreTranslate para Firefox](https://addons.mozilla.org/en-US/firefox/addon/libretranslate/) es una extensión para Firefox para traducir con LibreTranslate
- [LibreTranslateClient para Firefox](https://addons.mozilla.org/en-US/firefox/addon/libretranslateclient/) es otra extensión para Firefox para traducir con LibreTranslate
- [minbrowser](https://minbrowser.org/) es un navegador web con [soporte integrado para LibreTranslate](https://github.com/argosopentech/argos-translate/discussions/158#discussioncomment-1141551)
