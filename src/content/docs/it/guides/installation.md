---
title: Installazione
description: Mettiti in funzione con LibreTranslate.
---

## Con Python

Assicurati di avere Python >= 3.8 installato, quindi da un terminale esegui:

```bash
pip install libretranslate
libretranslate [args]
```

Quindi apri un browser web su <http://localhost:5000>

Per impostazione predefinita, LibreTranslate installerà il supporto per tutte le lingue disponibili. Per caricare solo alcune lingue e ridurre i tempi di avvio, puoi utilizzare l'argomento `--load-only`:

```bash
libretranslate --load-only en,es,fr
```

Controlla l'elenco degli [argomenti](#arguments) per ulteriori opzioni.

:::note
In produzione si consiglia di eseguire LibreTranslate con Gunicorn o Docker (che è configurato con Gunicorn) per evitare perdite di memoria.
:::

Per utilizzare il rilevatore di confini di frase più veloce ([MiniSBD](https://github.com/LibreTranslate/MiniSBD)) usa:

```bash
ARGOS_CHUNK_TYPE=MINISBD libretranslate [...]
```

## Con Docker

Puoi anche eseguire l'applicazione con [docker](https://docker.com). Per prima cosa clona il repository:

```bash
git clone https://github.com/LibreTranslate/LibreTranslate
cd LibreTranslate
```

Quindi su Linux/macOS esegui `./run.sh [args]`, su Windows esegui `run.bat [args]`.

:::note
La versione docker utilizza MiniSBD per il rilevamento dei confini di frase per impostazione predefinita. Puoi sovrascriverlo modificando run.sh o run.bat e impostando una variabile d'ambiente docker `-e ARGOS_CHUNK_TYPE=STANZA`.
:::

### CUDA

È possibile utilizzare l'accelerazione hardware per velocizzare le traduzioni su una macchina GPU con CUDA 12.4.1 e [nvidia-docker](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) installato.

Esegui questa versione con:

```bash
docker compose -f docker-compose.cuda.yml up -d --build
```

## Con WSGI e Gunicorn

```bash
pip install gunicorn
gunicorn --bind 0.0.0.0:5000 'wsgi:app()'
```

È possibile passare gli argomenti dell'applicazione direttamente a Gunicorn tramite:

```bash
gunicorn --bind 0.0.0.0:5000 'wsgi:app(api_keys=True)'
```

## Con Kubernetes

Vedi [articolo Medium di JM Robles](https://jmrobles.medium.com/libretranslate-your-own-translation-service-on-kubernetes-b46c3e1af630) e il [k8s.yaml](https://github.com/LibreTranslate/LibreTranslate/blob/main/k8s.yaml) migliorato da @rasos.

### Grafico Helm

Basato sul lavoro di @rasos, ora puoi installare LibreTranslate su Kubernetes usando Helm.

Un grafico Helm è ora disponibile nel repository [helm-chart](https://github.com/LibreTranslate/helm-chart/) dove puoi trovare maggiori dettagli.

Puoi installare rapidamente LibreTranslate su Kubernetes usando Helm con il seguente comando:

```bash
helm repo add libretranslate https://libretranslate.github.io/helm-chart/
helm repo update
helm search repo libretranslate

helm install libretranslate libretranslate/libretranslate --namespace libretranslate --create-namespace
```

## Argomenti

| Argomento | Descrizione | Predefinito |
| --- | --- | --- |
| `--host` | Imposta l'host a cui associare il server | `127.0.0.1` |
| `--port` | Imposta la porta a cui associare il server | `5000` |
| `--char-limit` | Imposta il limite di caratteri | `Nessun limite` |
| `--req-limit` | Imposta il numero massimo di richieste al minuto per client (al di fuori dei limiti impostati dalle chiavi api) | `Nessun limite` |
