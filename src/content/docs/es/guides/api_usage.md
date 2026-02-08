---
title: Uso de la API
description: Cómo traducir con LibreTranslate.
---

Los siguientes ejemplos usan Javascript, pero puedes usar cualquier lenguaje de programación. También hay [enlaces de lenguaje](#language-bindings) disponibles para muchos lenguajes de programación.

### Traducción Simple

Solicitud:

```javascript
const res = await fetch("https://libretranslate.com/translate", {
  method: "POST",
  body: JSON.stringify({
    q: "Hello!",
    source: "en",
    target: "es",
    api_key: "xxxxxx" // puede ser opcional si lo alojas tú mismo
  }),
  headers: { "Content-Type": "application/json" },
});

console.log(await res.json());
```

Respuesta:

```javascript
{
    "translatedText": "¡Hola!"
}
```

:::note
El parámetro `api_key` solo es necesario cuando se utiliza una instancia configurada con claves API, como [libretranslate.com](https://libretranslate.com). Las instancias que alojas tú mismo no lo requieren.
:::

### Detección Automática del Idioma de Origen

Solicitud:

```javascript
const res = await fetch("https://libretranslate.com/translate", {
  method: "POST",
  body: JSON.stringify({
    q: "Bonjour!",
    source: "auto",
    target: "en",
    api_key: "xxxxxx"
  }),
  headers: { "Content-Type": "application/json" },
});

console.log(await res.json());
```

Respuesta:

```javascript
{
    "detectedLanguage": {
        "confidence": 90.0,
        "language": "fr"
    },
    "translatedText": "Hello!"
}
```

### Traducir HTML/Marcado

Solicitud:

```javascript
const res = await fetch("https://libretranslate.com/translate", {
  method: "POST",
  body: JSON.stringify({
    q: '<p class="green">Hello!</p>',
    source: "en",
    target: "es",
    format: "html",
    api_key: "xxxxxx"
  }),
  headers: { "Content-Type": "application/json" },
});

console.log(await res.json());
```

Respuesta:

```javascript
{
    "translatedText": "<p class=\"green\">¡Hola!</p>"
}
```

### Traducciones Alternativas

Solicitud:

```javascript
const res = await fetch("https://libretranslate.com/translate", {
  method: "POST",
  body: JSON.stringify({
    q: "Hello",
    source: "en",
    target: "it",
    format: "text",
    alternatives: 3,
    api_key: "xxxxxx"
  }),
  headers: { "Content-Type": "application/json" },
});

console.log(await res.json());
```

Respuesta:

```javascript
{
    "alternatives": [
        "Salve",
        "Pronto"
    ],
    "translatedText": "Ciao"
}
```

### Detección de Idioma

Solicitud:

```javascript
const res = await fetch("https://libretranslate.com/detect", {
  method: "POST",
  body: JSON.stringify({
    q: "Bonjour!",
  }),
  headers: { "Content-Type": "application/json" },
});

console.log(await res.json());
```

Respuesta:

```javascript
[{
    "confidence": 90.0,
    "language": "fr"
}]
```


### Idiomas Soportados

https://libretranslate.com/languages

## Enlaces de Lenguaje

Puedes usar la API de LibreTranslate con los siguientes enlaces:

- Rust: <https://github.com/DefunctLizard/libretranslate-rs>
- Node.js: <https://github.com/franciscop/translate>
- TypeScript: <https://github.com/tderflinger/libretranslate-ts>
- .Net: <https://github.com/sigaloid/LibreTranslate.Net>
- Go: <https://github.com/SnakeSel/libretranslate>
- Python: <https://github.com/argosopentech/LibreTranslate-py>
- PHP: <https://github.com/jefs42/libretranslate>
- C++: <https://github.com/argosopentech/LibreTranslate-cpp>
- Swift: <https://github.com/wacumov/libretranslate>
- Unix: <https://github.com/argosopentech/LibreTranslate-sh>
- Shell: <https://github.com/Hayao0819/Hayao-Tools/tree/master/libretranslate-sh>
- Java: <https://github.com/suuft/libretranslate-java>
- Ruby: <https://github.com/noesya/libretranslate>
- R: <https://github.com/myanesp/libretranslateR>
