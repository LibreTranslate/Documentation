---
title: Servidor MCP
description: Cómo hacer que LibreTranslate esté disponible para agentes de IA.
---

LibreTranslate puede dar capacidades de traducción automática a agentes de IA que soporten el protocolo [MCP](https://modelcontextprotocol.io/docs/getting-ting-started/intro).

## Configuración

Añade esto a la configuración de tu cliente:

### OpenCode

```json
{
  "mcp": {
    "LibreTranslate": {
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

| Variable                 | Descripción                                                                |
| ------------------------ | -------------------------------------------------------------------------- |
| `LIBRETRANSLATE_API_URL` | URL de la API de LibreTranslate (por defecto: `https://libretranslate.com`)      |
| `LIBRETRANSLATE_API_KEY` | Clave de API para el servicio LibreTranslate (requerida para `libretranslate.com`) |


## Herramientas disponibles

### `detect`

Detecta el idioma de un texto dado.

### `translate`

Traduce texto de un idioma a otro.

### `languages`

Lista todos los idiomas soportados para la traducción.

Consulta [LibreTranslate-MCP](https://github.com/LibreTranslate/LibreTranslate-MCP) para detalles de implementación.
