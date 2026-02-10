---
title: Installation
description: Installez et configurez LibreTranslate.
---

## Avec Python

Assurez-vous d'avoir Python >= 3.8 installé, puis depuis un terminal exécutez :

```bash
pip install libretranslate
libretranslate [args]
```

Ensuite, ouvrez un navigateur web vers <http://localhost:5000>

Par défaut, LibreTranslate installera le support pour toutes les langues disponibles. Pour ne charger que certaines langues et réduire le temps de démarrage, vous pouvez utiliser l'argument `--load-only` :

```bash
libretranslate --load-only en,es,fr
```

Vérifiez la liste des [arguments](#arguments) pour plus d'options.

:::note
En production, il est recommandé d'exécuter LibreTranslate avec Gunicorn ou Docker (qui est configuré avec Gunicorn) afin d'éviter les fuites de mémoire.
:::

Pour utiliser le détecteur de limites de phrases plus rapide ([MiniSBD](https://github.com/LibreTranslate/MiniSBD)) utilisez :

```bash
ARGOS_CHUNK_TYPE=MINISBD libretranslate [...]
```

## Avec Docker

Vous pouvez également exécuter l'application avec [docker](https://docker.com). Clonez d'abord le dépôt :

```bash
git clone https://github.com/LibreTranslate/LibreTranslate
cd LibreTranslate
```

Ensuite sur Linux/macOS exécutez `./run.sh [args]`, sur Windows exécutez `run.bat [args]`.

### CUDA

Vous pouvez utiliser l'accélération matérielle pour accélérer les traductions sur un système équipé d'un GPU avec CUDA 12.4.1 et [nvidia-docker](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) installés.

Exécutez cette version avec :

```bash
docker compose -f docker-compose.cuda.yml up -d --build
```

## Avec WSGI et Gunicorn

```bash
pip install gunicorn
gunicorn --bind 0.0.0.0:5000 'wsgi:app()'
```

Vous pouvez passer des arguments d'application directement à Gunicorn via :

```bash
gunicorn --bind 0.0.0.0:5000 'wsgi:app(api_keys=True)'
```

## Avec Kubernetes

Voir l'[article Medium de JM Robles](https://jmrobles.medium.com/libretranslate-your-own-translation-service-on-kubernetes-b46c3e1af630) et le [k8s.yaml](https://github.com/LibreTranslate/LibreTranslate/blob/main/k8s.yaml) amélioré par @rasos.

### Helm Chart

Basé sur le travail de @rasos, vous pouvez maintenant installer LibreTranslate sur Kubernetes en utilisant Helm.

Un graphique Helm est maintenant disponible dans le dépôt [helm-chart](https://github.com/LibreTranslate/helm-chart/) où vous pouvez trouver plus de détails.

Vous pouvez installer rapidement LibreTranslate sur Kubernetes en utilisant Helm avec la commande suivante :

```bash
helm repo add libretranslate https://libretranslate.github.io/helm-chart/
helm repo update
helm search repo libretranslate

helm install libretranslate libretranslate/libretranslate --namespace libretranslate --create-namespace
```

## Arguments

| Argument | Description | Défaut |
| --- | --- | --- |
| `--host` | Définir l'hôte auquel lier le serveur | `127.0.0.1` |
| `--port` | Définir le port auquel lier le serveur | `5000` |
| `--char-limit` | Définir la limite de caractères | `No limit` |
| `--req-limit` | Définir le nombre maximum de requêtes par minute par client (en dehors des limites définies par les clés API) | `No limit` |
| `--req-limit-storage` | URI de stockage à utiliser pour le stockage des données de limite de requête. Voir [Flask Limiter](https://flask-limiter.readthedocs.io/en/stable/configuration.html) | `memory://` |
| `--req-time-cost` | Considère un coût de temps (en secondes) pour les besoins de limitation des requêtes. Si une requête prend 10 secondes et que cette valeur est définie à 5, le coût de la requête est de 2. | `No cost` |
| `--batch-limit` | Définir le nombre maximum de textes à traduire dans une requête groupée | `No limit` |
| `--frontend-language-source` | Définir la langue par défaut du frontend - source | `auto` |
| `--frontend-language-target` | Définir la langue par défaut du frontend - cible | `locale` |
| `--frontend-timeout` | Définir le délai d'expiration de la traduction du frontend | `500` |
| `--api-keys-db-path` | Utiliser un chemin spécifique à l'intérieur du conteneur pour la base de données locale. Peut être absolu ou relatif | `db/api_keys.db` |
| `--api-keys-remote` | Utiliser ce endpoint distant pour interroger les clés API valides au lieu d'utiliser la base de données locale | `Use local db` |
| `--get-api-key-link` | Afficher un lien dans l'interface utilisateur pour diriger les utilisateurs vers l'obtention d'une clé API | `No API link displayed` |
| `--shared-storage` | URI de stockage partagé à utiliser pour le partage de données multi-processus (par ex. lors de l'utilisation de gunicorn) | `memory://` |
| `--secondary` | Marquer cette instance comme une instance secondaire pour éviter les conflits avec le nœud primaire dans les configurations multi-nœuds | `Primary` |
| `--load-only` | Définir les langues disponibles | `All` |
| `--threads` | Définir le nombre de threads | `4` |
| `--metrics-auth-token` | Protéger le endpoint /metrics en autorisant uniquement les clients qui ont un jeton d'autorisation Bearer valide | `No auth` |
| `--url-prefix` | Ajouter un préfixe à l'URL : example.com:5000/url-prefix/ | `/` |
| `--debug` | Activer l'environnement de débogage | `Disabled` |
| `--ssl` | Activer SSL | `Disabled` |
| `--api-keys` | Activer la base de données des clés API pour les limites de taux par client lorsque --req-limit est atteint | `Disabled` |
| `--require-api-key-origin` | Exiger l'utilisation d'une clé API pour l'accès programmatique à l'API, sauf si l'origine de la requête correspond à ce domaine | `Disabled` |
| `--require-api-key-secret` | Exiger l'utilisation d'une clé API pour l'accès programmatique à l'API, sauf si le client envoie également une correspondance secrète | `Disabled` |
| `--require-api-key-fingerprint` | Exiger l'utilisation d'une clé API pour l'accès programmatique à l'API, sauf si le client correspond également à une empreinte | `Disabled` |
| `--under-attack` | Activer le mode sous attaque. Lorsqu'il est activé, les requêtes doivent être faites avec une clé API | `Disabled` |
| `--suggestions` | Autoriser les suggestions des utilisateurs | `Disabled` |
| `--disable-files-translation` | Désactiver la traduction de fichiers | `Enabled` |
| `--disable-web-ui` | Désactiver l'interface web | `Enabled` |
| `--update-models` | Mettre à jour les modèles de langue au démarrage | `Disabled` |
| `--metrics` | Activer le endpoint /metrics pour exporter les métriques d'utilisation [Prometheus](https://prometheus.io/) | `Disabled` |
| `--translation-cache` | Mettre en cache la sortie de traduction pour les utilisateurs avec une clé API particulière (ou 'all' pour mettre en cache toutes les traductions) | `Disabled` |

:::tip
Pour toujours exiger l'utilisation d'une clé API, définissez `--req-limit` à `0` et ajoutez le drapeau `--api-keys`. Les requêtes faites sans une clé API valide seront rejetées.
:::

Chaque argument a une variable d'environnement équivalente qui peut être utilisée à la place. Les variables d'environnement surchargent les valeurs par défaut mais ont une priorité inférieure aux arguments de la ligne de commande et sont particulièrement utiles si elles sont utilisées avec Docker. Les noms des variables d'environnement sont en majuscule_snake_case du nom de l'argument de commande équivalent avec un préfixe `LT`. Par exemple `--char-limit` --> `LT_CHAR_LIMIT`.


## Mise à jour

### Logiciel

Si vous avez installé avec pip :

`pip install -U libretranslate`

Si vous utilisez docker :

`docker pull libretranslate/libretranslate`

### Modèles de langue

Démarrez le programme avec l'argument `--update-models`. Par exemple : `libretranslate --update-models` ou `./run.sh --update-models`. Définir `--update-models` mettra à jour les modèles, que des mises à jour soient disponibles ou non.

Alternativement, vous pouvez également exécuter le script `scripts/install_models.py`.


## Métriques Prometheus

LibreTranslate a des capacités d'[exportateur](https://prometheus.io/docs/instrumenting/exporters/) Prometheus lorsque vous passez l'argument `--metrics` au démarrage (désactivé par défaut). Lorsque les métriques sont activées, un endpoint `/metrics` est monté sur l'instance :

<http://localhost:5000/metrics>

```promql
# HELP libretranslate_http_requests_in_flight Multiprocess metric
# TYPE libretranslate_http_requests_in_flight gauge
libretranslate_http_requests_in_flight{api_key="",endpoint="/translate",request_ip="127.0.0.1"} 0.0
# HELP libretranslate_http_request_duration_seconds Multiprocess metric
# TYPE libretranslate_http_request_duration_seconds summary
libretranslate_http_request_duration_seconds_count{api_key="",endpoint="/translate",request_ip="127.0.0.1",status="200"} 0.0
libretranslate_http_request_duration_seconds_sum{api_key="",endpoint="/translate",request_ip="127.0.0.1",status="200"} 0.0
```

Vous pouvez ensuite configurer `prometheus.yml` pour lire les métriques :

```yaml
scrape_configs:
  - job_name: "libretranslate"

    # Needed only if you use --metrics-auth-token
    #authorization:
    #credentials: "mytoken"

    static_configs:
      - targets: ["localhost:5000"]
```

Pour sécuriser le endpoint `/metrics`, vous pouvez également utiliser `--metrics-auth-token mytoken`.

Si vous utilisez Gunicorn, assurez-vous de créer un répertoire pour stocker les métriques de données multiprocessus et définissez `PROMETHEUS_MULTIPROC_DIR` :

```bash
mkdir -p /tmp/prometheus_data
rm /tmp/prometheus_data/*
export PROMETHEUS_MULTIPROC_DIR=/tmp/prometheus_data
gunicorn -c scripts/gunicorn_conf.py --bind 0.0.0.0:5000 'wsgi:app(metrics=True)'
```
