---
title: Gérer les clés API
description: Apprenez comment émettre et gérer les clés API.
---

:::tip[Cette information est pour les instances auto-hébergées]
Si vous avez besoin d'une clé API pour [libretranslate.com](https://libretranslate.com), vous devez l'acheter [ici](https://portal.libretranslate.com).
:::

## Gérer les clés API

LibreTranslate supporte des quotas limites par utilisateur, par ex. vous pouvez émettre des clés API aux utilisateurs pour qu'ils puissent profiter de limites de requêtes plus élevées par minute (si vous définissez aussi `--req-limit`). Par défaut, tous les utilisateurs sont limités en taux basé sur `--req-limit`, mais passer un paramètre optionnel `api_key` aux endpoints REST permet à un utilisateur de profiter de limites de requêtes plus élevées. Vous pouvez également spécifier des limites de caractères différentes qui contournent la valeur par défaut `--char-limit` base par clé.

Pour utiliser les clés API, démarrez simplement LibreTranslate avec l'option `--api-keys`. Si vous avez modifié le chemin de la base de données des clés API avec l'option `--api-keys-db-path`, vous devez spécifier le chemin avec le même drapeau d'argument lors de l'utilisation de la commande `ltmanage keys`.

### Ajouter une nouvelle clé

Pour émettre une nouvelle clé API avec une limite de 120 requêtes par minute :

```bash
ltmanage keys add 120
```

Pour émettre une nouvelle clé API avec 120 requêtes par minute et un maximum de 5 000 caractères par requête :

```bash
ltmanage keys add 120 --char-limit 5000
```

Si vous avez changé le chemin de la base de données des clés API :

```bash
ltmanage keys --api-keys-db-path path/to/db/dbName.db add 120
```

### Supprimer des clés

```bash
ltmanage keys remove <api-key>
```

### Voir les clés

```bash
ltmanage keys
```
