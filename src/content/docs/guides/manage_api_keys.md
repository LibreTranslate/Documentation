---
title: Manage API Keys
description: Learn how to issue and manage API Keys.
---

:::tip[This information is for self-hosted instances]
If you need an API Key for [libretranslate.com](https://libretranslate.com), you need to purchase it from [here](https://portal.libretranslate.com).
:::

## Manage API Keys

LibreTranslate supports per-user limit quotas, e.g. you can issue API keys to users so that they can enjoy higher requests limits per minute (if you also set `--req-limit`). By default all users are rate-limited based on `--req-limit`, but passing an optional `api_key` parameter to the REST endpoints allows a user to enjoy higher request limits. You can also specify different character limits that bypass the default `--char-limit` value on a per-key basis.

To use API keys simply start LibreTranslate with the `--api-keys` option. If you modified the API keys database path with the option `--api-keys-db-path`, you must specify the path with the same argument flag when using the `ltmanage keys` command.

### Add New Key

To issue a new API key with 120 requests per minute limits:

```bash
ltmanage keys add 120
```

To issue a new API key with 120 requests per minute and a maximum of 5,000 characters per request:

```bash
ltmanage keys add 120 --char-limit 5000
```

If you changed the API keys database path:

```bash
ltmanage keys --api-keys-db-path path/to/db/dbName.db add 120
```

### Remove Keys

```bash
ltmanage keys remove <api-key>
```

### View Keys

```bash
ltmanage keys
```