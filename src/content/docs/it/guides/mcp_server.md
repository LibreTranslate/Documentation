---
title: Server MCP
description: Come rendere LibreTranslate disponibile per gli agenti AI.
---

LibreTranslate può fornire capacità di traduzione automatica agli agenti AI che supportano il protocollo [MCP](https://modelcontextprotocol.io/docs/getting-ting-started/intro).

## Configurazione

Aggiungi questo alla configurazione del tuo client:

### OpenCode

```json
{
  "mcp": {
    "LibreTranslate": {
      "type": "local",
      "command": ["npx", "-y", "@libretranslate/mcp"],
      "environment": {
        "LIBRETRANSLATE_API_URL": "https://libretranslate.com",
        "LIBRETRANSLATE_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Claude

```json
{
  "mcpServers": {
    "libretranslate": {
      "command": "npx",
      "args": ["-y", "@libretranslate/mcp"],
      "env": {
        "LIBRETRANSLATE_API_URL": "https://libretranslate.com",
        "LIBRETRANSLATE_API_KEY": "your-api-key"
      }
    }
  }
}
```

| Variabile                | Descrizione                                                                      |
| ------------------------ | -------------------------------------------------------------------------------- |
| `LIBRETRANSLATE_API_URL` | URL dell'API di LibreTranslate (predefinito: `https://libretranslate.com`)         |
| `LIBRETRANSLATE_API_KEY` | Chiave API per il servizio LibreTranslate (richiesta per `libretranslate.com`) |


## Strumenti disponibili

### `detect`

Rileva la lingua di un dato testo.

### `translate`

Traduci il testo da una lingua all'altra.

### `languages`

Elenca tutte le lingue supportate per la traduzione.

Vedi [LibreTranslate-MCP](https://github.com/LibreTranslate/LibreTranslate-MCP) per i dettagli d'implementazione.
