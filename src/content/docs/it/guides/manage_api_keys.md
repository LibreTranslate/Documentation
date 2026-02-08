---
title: Gestione Chiavi API
description: Impara come emettere e gestire le Chiavi API.
---

:::tip[Queste informazioni sono per le istanze self-hosted]
Se hai bisogno di una Chiave API per [libretranslate.com](https://libretranslate.com), devi acquistarla da [qui](https://portal.libretranslate.com).
:::

## Gestione delle Chiavi API

LibreTranslate supporta quote limite per utente, ad esempio puoi emettere chiavi API agli utenti in modo che possano godere di limiti di richieste più elevati al minuto (se imposti anche `--req-limit`). Per impostazione predefinita, tutti gli utenti sono limitati in base a `--req-limit`, ma passare un parametro `api_key` facoltativo agli endpoint REST consente a un utente di usufruire di limiti di richiesta più elevati. Puoi anche specificare limiti di caratteri diversi che ignorano il valore predefinito di `--char-limit` per ogni chiave.

Per utilizzare le chiavi API, avvia semplicemente LibreTranslate con l'opzione `--api-keys`. Se hai modificato il percorso del database delle chiavi API con l'opzione `--api-keys-db-path`, devi specificare il percorso con lo stesso flag quando usi il comando `ltmanage keys`.

### Aggiungi Nuova Chiave

Per emettere una nuova chiave API con un limite di 120 richieste al minuto:

```bash
ltmanage keys add 120
```

Per emettere una nuova chiave API con 120 richieste al minuto e un massimo di 5.000 caratteri per richiesta:

```bash
ltmanage keys add 120 --char-limit 5000
```

Se hai cambiato il percorso del database delle chiavi API:

```bash
ltmanage keys --api-keys-db-path path/to/db/dbName.db add 120
```

### Rimuovi Chiavi

```bash
ltmanage keys remove <api-key>
```

### Visualizza Chiavi

```bash
ltmanage keys
```
