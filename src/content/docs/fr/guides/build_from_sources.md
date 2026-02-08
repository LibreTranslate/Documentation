---
title: Compiler depuis les sources
description: Installez et configurez LibreTranslate.
---

Si vous souhaitez apporter des modifications au code, vous pouvez compiler depuis les sources.

Installez [`hatch`](https://hatch.pypa.io) pour gérer les dépendances du projet et exécuter les scripts de développement :

```bash
pipx install hatch
```

Clonez le dépôt :

```bash
git clone https://github.com/LibreTranslate/LibreTranslate.git
cd LibreTranslate
```

Hatch installera automatiquement les dépendances requises dans un environnement virtuel et activera [`pre-commit`](https://pre-commit.com/), qui s'exécutera avant chaque commit pour formater le code. Vous pouvez ignorer les vérifications `pre-commit` lors du commit si nécessaire : `git commit --no-verify -m "Fix"`

Exécuter en développement :

```bash
hatch run dev --debug
```

Ensuite, ouvrez un navigateur web vers <http://localhost:5000>

Vous pouvez également démarrer un nouveau shell dans un environnement virtuel avec libretranslate installé :

```bash
hatch shell
libretranslate [args]
# Ou
python main.py [args]
```

> Vous pouvez toujours utiliser `pip install -e ".[test]"` directement si vous ne voulez pas utiliser hatch.

## Exécuter les tests

Exécuter la suite de tests et les vérifications de linting :

```bash
hatch run test
```

Pour afficher tous les `print()` lors du débogage :

```bash
hatch run test -s
```

Vous pouvez également exécuter les tests sur plusieurs versions de python :

```bash
hatch run all:test
```

Vous pouvez nettoyer l'environnement virtuel avec :

```bash
hatch env prune
```

## Construire avec Docker

```bash
docker build -f docker/Dockerfile [--build-arg with_models=true] -t libretranslate .
```

Si vous souhaitez exécuter l'image Docker dans un environnement complètement hors ligne, vous devez ajouter le paramètre `--build-arg with_models=true`. Ensuite, les modèles de langue sont téléchargés pendant le processus de construction de l'image. Sinon, ces modèles sont téléchargés lors de la première exécution de l'image/du conteneur.

Exécuter l'image construite :

```bash
docker run -it -p 5000:5000 libretranslate [args]
```

Ou construire et exécuter en utilisant Docker Compose :

```bash
docker compose up -d --build
```

> N'hésitez pas à modifier le fichier [`docker-compose.yml`](https://github.com/LibreTranslate/LibreTranslate/blob/main/docker-compose.yml) pour l'adapter à vos besoins de déploiement, ou utilisez un fichier `docker-compose.prod.yml` supplémentaire pour votre configuration de déploiement.
>
> Les modèles sont stockés à l'intérieur du conteneur sous `/home/libretranslate/.local/share` et `/home/libretranslate/.local/cache`. N'hésitez pas à utiliser des volumes si vous ne voulez pas retélécharger les modèles lorsque le conteneur est détruit. Pour mettre à jour les modèles, utilisez l'argument `--update-models`.

## FAQ

### Environnement géré en externe

Certains utilisateurs peuvent rencontrer l'erreur suivante lors de l'installation de paquets :

```
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
    python3-xyz, where xyz is the package you are trying to
    install.

    …
```

Cela se produit lorsque votre système d'exploitation dépend de et gère Python pour ses fonctionnalités principales. Dans ce cas, vous devez installer et configurer venv (environnements virtuels) pour gérer les dépendances du projet.

Cela empêche l'installation de paquets pip à l'échelle du système. De cette façon, il n'y a aucun risque de conflit entre les paquets pip de plusieurs projets ou du système d'exploitation.
