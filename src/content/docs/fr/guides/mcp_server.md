---
title: Serveur MCP
description: Comment rendre LibreTranslate disponible pour les agents IA.
---

LibreTranslate peut fournir des capacités de traduction automatique aux agents IA qui prennent en charge le protocole [MCP](https://modelcontextprotocol.io/docs/getting-started/intro).

## Configuration

Ajoutez ceci à la configuration de votre client :

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

| Variable                 | Description                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `LIBRETRANSLATE_API_URL` | URL de l'API LibreTranslate (par défaut : `https://libretranslate.com`)               |
| `LIBRETRANSLATE_API_KEY` | Clé API pour le service LibreTranslate (requise pour `libretranslate.com`) |


## Outils disponibles

### `detect`

Détecter la langue d'un texte donné.

### `translate`

Traduire un texte d'une langue à une autre.

### `languages`

Lister toutes les langues prises en charge pour la traduction.

Voir [LibreTranslate-MCP](https://github.com/LibreTranslate/LibreTranslate-MCP) pour les détails d'implémentation.
