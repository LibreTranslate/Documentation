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
