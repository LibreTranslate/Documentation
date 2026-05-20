---
title: MCP Server
description: How to make LibreTranslate available to AI agents.
---

LibreTranslate can give machine translation capabilities to AI agents that support the [MCP](https://modelcontextprotocol.io/docs/getting-started/intro) protocol.

## Configuration

Add this to your client's configuration:

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

| Variable                 | Description                                                                |
| ------------------------ | -------------------------------------------------------------------------- |
| `LIBRETRANSLATE_API_URL` | URL of the LibreTranslate API (default: `https://libretranslate.com`)      |
| `LIBRETRANSLATE_API_KEY` | API key for the LibreTranslate service (required for `libretranslate.com`) |


## Available Tools

### `detect`

Detect the language of a given text.

### `translate`

Translate text from one language to another.

### `languages`

List all supported languages for translation.

See [LibreTranslate-MCP](https://github.com/LibreTranslate/LibreTranslate-MCP) for implementation details.