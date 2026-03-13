---
title: Utilizzo API
description: Come tradurre con LibreTranslate.
---

Gli esempi seguenti utilizzano Javascript, ma è possibile utilizzare qualsiasi linguaggio di programmazione. Sono disponibili anche [associazioni di linguaggi](#language-bindings) per molti linguaggi di programmazione.

### Traduzione Semplice

Richiesta:

```javascript
const res = await fetch("https://libretranslate.com/translate", {
  method: "POST",
  body: JSON.stringify({
    q: "Hello!",
    source: "en",
    target: "es",
    api_key: "xxxxxx" // può essere facoltativo con l'auto-hosting
  }),
  headers: { "Content-Type": "application/json" },
});

console.log(await res.json());
```

Risposta:

```javascript
{
    "translatedText": "¡Hola!"
}
```

:::note
Il parametro `api_key` è richiesto solo quando si utilizza un'istanza configurata con chiavi API, come [libretranslate.com](https://libretranslate.com). Le istanze auto-ospitate non lo richiedono.
:::

### Rilevamento Automatico della Lingua di Origine

Richiesta:

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

Risposta:

```javascript
{
    "detectedLanguage": {
        "confidence": 90.0,
        "language": "fr"
    },
    "translatedText": "Hello!"
}
```

### Tradurre HTML/Markup

Richiesta:

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

Risposta:

```javascript
{
    "translatedText": "<p class=\"green\">¡Hola!</p>"
}
```

### Traduzioni Alternative

Richiesta:

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

Risposta:

```javascript
{
    "alternatives": [
        "Salve",
        "Pronto"
    ],
    "translatedText": "Ciao"
}
```

### Rilevamento Lingua

Richiesta:

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

Risposta:

```javascript
[{
    "confidence": 90.0,
    "language": "fr"
}]
```


### Lingue Supportate

https://libretranslate.com/languages

## Interfacce di Binding

È possibile utilizzare l'API di LibreTranslate utilizzando i seguenti bindings:

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
- Java: <https://github.com/stokito/libretranslate-java>
- Ruby: <https://github.com/noesya/libretranslate>
- R: <https://github.com/myanesp/libretranslateR>
