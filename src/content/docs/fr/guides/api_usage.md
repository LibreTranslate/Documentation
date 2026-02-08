---
title: Utilisation de l'API
description: Comment traduire avec LibreTranslate.
---

Les exemples ci-dessous utilisent Javascript, mais vous pouvez utiliser n'importe quel langage de programmation. Des [bindings](#bindings-de-langage) pour de nombreux langages de programmation sont également disponibles.

### Traduction simple

Requête :

```javascript
const res = await fetch("https://libretranslate.com/translate", {
  method: "POST",
  body: JSON.stringify({
    q: "Hello!",
    source: "en",
    target: "es",
    api_key: "xxxxxx" // peut être optionnel avec l'auto-hébergé
  }),
  headers: { "Content-Type": "application/json" },
});

console.log(await res.json());
```

Réponse :

```javascript
{
    "translatedText": "¡Hola!"
}
```

:::note
Le paramètre `api_key` n'est requis que lors de l'utilisation d'une instance configurée avec des clés API, telle que [libretranslate.com](https://libretranslate.com). Les instances auto-hébergées ne le nécessitent pas.
:::

### Détection automatique de la langue source

Requête :

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

Réponse :

```javascript
{
    "detectedLanguage": {
        "confidence": 90.0,
        "language": "fr"
    },
    "translatedText": "Hello!"
}
```

### Traduire du HTML/balisage

Requête :

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

Réponse :

```javascript
{
    "translatedText": "<p class=\"green\">¡Hola!</p>"
}
```

### Traductions alternatives

Requête :

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

Réponse :

```javascript
{
    "alternatives": [
        "Salve",
        "Pronto"
    ],
    "translatedText": "Ciao"
}
```

### Détection de langue

Requête :

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

Réponse :

```javascript
[{
    "confidence": 90.0,
    "language": "fr"
}]
```


### Langues supportées

https://libretranslate.com/languages

## Bindings de langage

Vous pouvez utiliser l'API LibreTranslate en utilisant les bindings suivants :

- Rust : <https://github.com/DefunctLizard/libretranslate-rs>
- Node.js : <https://github.com/franciscop/translate>
- TypeScript : <https://github.com/tderflinger/libretranslate-ts>
- .Net : <https://github.com/sigaloid/LibreTranslate.Net>
- Go : <https://github.com/SnakeSel/libretranslate>
- Python : <https://github.com/argosopentech/LibreTranslate-py>
- PHP : <https://github.com/jefs42/libretranslate>
- C++ : <https://github.com/argosopentech/LibreTranslate-cpp>
- Swift : <https://github.com/wacumov/libretranslate>
- Unix : <https://github.com/argosopentech/LibreTranslate-sh>
- Shell : <https://github.com/Hayao0819/Hayao-Tools/tree/master/libretranslate-sh>
- Java : <https://github.com/suuft/libretranslate-java>
- Ruby : <https://github.com/noesya/libretranslate>
- R : <https://github.com/myanesp/libretranslateR>
