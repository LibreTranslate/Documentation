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

### CUDA

È possibile utilizzare l'accelerazione hardware per velocizzare le traduzioni su un sistema dotato di GPU con CUDA 12.4.1 e [nvidia-docker](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) installato.

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
| `--req-limit-storage` | URI di archiviazione da utilizzare per l'archiviazione dei dati sui limiti di richiesta. Vedi [Flask Limiter](https://flask-limiter.readthedocs.io/en/stable/configuration.html) | `memory://` |
| `--req-time-cost` | Considera un costo in tempo (in secondi) ai fini della limitazione delle richieste. Se una richiesta impiega 10 secondi e questo valore è impostato su 5, il costo della richiesta è 2. | `Nessun costo` |
| `--batch-limit` | Imposta il numero massimo di testi da tradurre in una richiesta batch | `Nessun limite` |
| `--frontend-language-source` | Imposta la lingua predefinita del frontend - sorgente | `auto` |
| `--frontend-language-target` | Imposta la lingua predefinita del frontend - destinazione | `locale` |
| `--frontend-timeout` | Imposta il timeout della traduzione del frontend | `500` |
| `--api-keys-db-path` | Utilizza un percorso specifico all'interno del contenitore per il database locale. Può essere assoluto o relativo | `db/api_keys.db` |
| `--api-keys-remote` | Utilizza questo endpoint remoto per interrogare le chiavi API valide invece di utilizzare il database locale | `Usa db locale` |
| `--get-api-key-link` | Mostra un link nell'interfaccia utente per indirizzare gli utenti a ottenere una chiave API | `Nessun link API visualizzato` |
| `--shared-storage` | URI di archiviazione condivisa da utilizzare per la condivisione di dati multi-processo (ad es. quando si utilizza gunicorn) | `memory://` |
| `--secondary` | Contrassegna questa istanza come istanza secondaria per evitare conflitti con il nodo primario in configurazioni multi-nodo | `Primario` |
| `--load-only` | Imposta le lingue disponibili | `Tutte` |
| `--threads` | Imposta il numero di thread | `4` |
| `--metrics-auth-token` | Proteggi l'endpoint /metrics consentendo solo ai client che dispongono di un token di autorizzazione Bearer valido | `Nessuna autenticazione` |
| `--url-prefix` | Aggiungi un prefisso all'URL: example.com:5000/url-prefix/ | `/` |
| `--debug` | Abilita l'ambiente di debug | `Disabilitato` |
| `--ssl` | Abilita SSL | `Disabilitato` |
| `--api-keys` | Abilita il database delle chiavi API per i limiti di velocità per client quando viene raggiunto --req-limit | `Disabilitato` |
| `--require-api-key-origin` | Richiedi l'uso di una chiave API per l'accesso programmatico all'API, a meno che l'origine della richiesta non corrisponda a questo dominio | `Disabilitato` |
| `--require-api-key-secret` | Richiedi l'uso di una chiave API per l'accesso programmatico all'API, a meno che il client non invii anche un segreto corrispondente | `Disabilitato` |
| `--require-api-key-fingerprint` | Richiedi l'uso di una chiave API per l'accesso programmatico all'API, a meno che il client non corrisponda anche a un'impronta digitale | `Disabilitato` |
| `--under-attack` | Abilita la modalità sotto attacco. Quando abilitato, le richieste devono essere effettuate con una chiave API | `Disabilitato` |
| `--suggestions` | Consenti suggerimenti degli utenti | `Disabilitato` |
| `--disable-files-translation` | Disabilita la traduzione dei file | `Abilitato` |
| `--disable-web-ui` | Disabilita l'interfaccia utente web | `Abilitato` |
| `--update-models` | Aggiorna i modelli linguistici all'avvio | `Disabilitato` |
| `--metrics` | Abilita l'endpoint /metrics per l'esportazione delle metriche di utilizzo di [Prometheus](https://prometheus.io/) | `Disabilitato` |
| `--translation-cache` | Memorizza nella cache l'output della traduzione per gli utenti con una particolare chiave API (o 'all' per memorizzare nella cache tutte le traduzioni) | `Disabilitato` |

:::tip
Per richiedere sempre l'uso di una chiave API, imposta `--req-limit` su `0` e aggiungi il flag `--api-keys`. Le richieste effettuate senza una chiave API appropriata verranno rifiutate.
:::

Ogni argomento ha una variabile d'ambiente equivalente che può essere utilizzata al suo posto. Le variabili d'ambiente sovrascrivono i valori predefiniti ma hanno una priorità inferiore rispetto agli argomenti della riga di comando e sono particolarmente utili se utilizzate con Docker. I nomi delle variabili d'ambiente sono l'upper_snake_case del nome dell'argomento del comando equivalente con un prefisso `LT`. Ad es. `--char-limit` --> `LT_CHAR_LIMIT`.


## Aggiornamento

### Software

Se hai installato con pip:

`pip install -U libretranslate`

Se stai usando docker:

`docker pull libretranslate/libretranslate`

### Modelli Linguistici

Avvia il programma con l'argomento `--update-models`. Ad esempio: `libretranslate --update-models` o `./run.sh --update-models`. L'impostazione di `--update-models` aggiornerà i modelli indipendentemente dal fatto che siano disponibili o meno aggiornamenti.

In alternativa puoi anche eseguire lo script `scripts/install_models.py`.


## Metriche Prometheus

LibreTranslate ha funzionalità di [esportatore](https://prometheus.io/docs/instrumenting/exporters/) Prometheus quando si passa l'argomento `--metrics` all'avvio (disabilitato per impostazione predefinita). Quando le metriche sono abilitate, un endpoint `/metrics` viene montato sull'istanza:

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

È quindi possibile configurare `prometheus.yml` per leggere le metriche:

```yaml
scrape_configs:
  - job_name: "libretranslate"

    # Necessario solo se si utilizza --metrics-auth-token
    #authorization:
    #credentials: "mytoken"

    static_configs:
      - targets: ["localhost:5000"]
```

Per proteggere l'endpoint `/metrics` è possibile utilizzare anche `--metrics-auth-token mytoken`.

Se si utilizza Gunicorn, assicurarsi di creare una directory per l'archiviazione delle metriche dei dati multiprocesso e impostare `PROMETHEUS_MULTIPROC_DIR`:

```bash
mkdir -p /tmp/prometheus_data
rm /tmp/prometheus_data/*
export PROMETHEUS_MULTIPROC_DIR=/tmp/prometheus_data
gunicorn -c scripts/gunicorn_conf.py --bind 0.0.0.0:5000 'wsgi:app(metrics=True)'
```
