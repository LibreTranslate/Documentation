---
title: Contribuir
description: Cómo contribuir a LibreTranslate.
---

¡Agradecemos las contribuciones! Aquí hay algunas formas de contribuir al proyecto:

## Financieramente

Puedes apoyar financieramente el proyecto comprando una [clave API](https://portal.libretranslate.com) y/o apoyar las bibliotecas ascendentes como [argos-translate](https://github.com/argosopentech/argos-translate) visitando su [página de patrocinio](https://github.com/sponsors/argosopentech).

## Contribuciones no monetarias

### Documentación

Puedes ayudarnos a mejorar esta [documentación](https://github.com/LibreTranslate/Documentation) o a [traducirla](https://github.com/LibreTranslate/Documentation/#translation).

### Interfaz de Usuario Web

La [interfaz de usuario web](https://libretranslate.com) de LibreTranslate está disponible en todos los idiomas compatibles con LibreTranslate. También puede (aproximadamente) [traducirse a sí misma!](https://github.com/LibreTranslate/LibreTranslate/blob/main/scripts/update_locales.py) Es posible que algunos idiomas no aparezcan en la interfaz de usuario porque aún no han sido revisados por un ser humano. Puedes habilitar todos los idiomas activando el modo `--debug`.

Puedes ayudarnos a mejorar o revisar las traducciones de la interfaz de usuario:

- Ve a <https://hosted.weblate.org/projects/libretranslate/app/#translations>. Todos los cambios se envían automáticamente al repositorio.
- Una vez que todas las cadenas hayan sido revisadas/modificadas, abre una pull request y modifica `libretranslate/locales/{code}/meta.json` o avísanos en el [foro de la comunidad](https://community.libretranslate.com) qué idioma has revisado y lo haremos por ti:

```json
{
 "name": "<Idioma>",
 "reviewed": true <-- Cambia de false a true
}
```

### Tareas de Desarrollo

- Puedes entrenar un nuevo modelo de lenguaje usando [Locomotive](https://github.com/LibreTranslate/Locomotive). Por ejemplo, queremos entrenar redes neuronales mejoradas para [alemán](https://community.libretranslate.com/t/help-wanted-improve-en-de-translation/935) y muchos otros idiomas.
- ¿Puedes superar el rendimiento de nuestros modelos de lenguaje? Entrena uno nuevo y comparémoslo. Para enviar tu modelo, publica en el [foro de la comunidad](https://community.libretranslate.com/) con un enlace para descargar tu archivo .argosmodel y un texto de ejemplo traducido por tu modelo.
- Ayúdanos a resolver un [problema](https://github.com/LibreTranslate/LibreTranslate/issues) existente.
- Agrega una nueva característica que te sea útil. Si no estás seguro, abre una discusión en nuestro [foro de la comunidad](https://community.libretranslate.com/) primero.
