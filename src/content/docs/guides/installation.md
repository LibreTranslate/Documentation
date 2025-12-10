---
title: Installation
description: Get up and running with LibreTranslate.
---

## With Python

Make sure you have Python >= 3.8 installed, then from a terminal run:

```bash
pip install libretranslate
libretranslate [args]
```

Then open a web browser to <http://localhost:5000>

By default LibreTranslate will install support for all available languages. To only load certain languages and reduce startup time, you can use the `--load-only` argument:

```bash
libretranslate --load-only en,es,fr
```

Check the [arguments](#arguments) list for more options.

:::note
In production it's recommended to run LibreTranslate with Gunicorn or Docker (which is setup with Gunicorn) in order to avoid memory leaks.
:::

## With Docker

You can also run the application with [docker](https://docker.com). First clone the repository:

```bash
git clone https://github.com/LibreTranslate/LibreTranslate
cd LibreTranslate
```

Then on Linux/macOS run `./run.sh [args]`, on Windows run `run.bat [args]`.

### CUDA

You can use hardware acceleration to speed up translations on a GPU machine with CUDA 12.4.1 and [nvidia-docker](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) installed.

Run this version with:

```bash
docker compose -f docker-compose.cuda.yml up -d --build
```

## With WSGI and Gunicorn

```bash
pip install gunicorn
gunicorn --bind 0.0.0.0:5000 'wsgi:app()'
```

You can pass application arguments directly to Gunicorn via:

```bash
gunicorn --bind 0.0.0.0:5000 'wsgi:app(api_keys=True)'
```

## With Kubernetes

See [Medium article by JM Robles](https://jmrobles.medium.com/libretranslate-your-own-translation-service-on-kubernetes-b46c3e1af630) and the improved [k8s.yaml](https://github.com/LibreTranslate/LibreTranslate/blob/main/k8s.yaml) by @rasos.

### Helm Chart

Based on @rasos work you can now install LibreTranslate on Kubernetes using Helm.

A Helm chart is now available in the [helm-chart](https://github.com/LibreTranslate/helm-chart/) repository where you can find more details.

You can quickly install LibreTranslate on Kubernetes using Helm with the following command:

```bash
helm repo add libretranslate https://libretranslate.github.io/helm-chart/
helm repo update
helm search repo libretranslate

helm install libretranslate libretranslate/libretranslate --namespace libretranslate --create-namespace
```

## Arguments

| Argument                        | Description                                                                                                                                        | Default                 |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `--host`                        | Set host to bind the server to                                                                                                                     | `127.0.0.1`             |
| `--port`                        | Set port to bind the server to                                                                                                                     | `5000`                  |
| `--char-limit`                  | Set character limit                                                                                                                                | `No limit`              |
| `--req-limit`                   | Set maximum number of requests per minute per client (outside of limits set by api keys)                                                           | `No limit`              |
| `--req-limit-storage`           | Storage URI to use for request limit data storage. See [Flask Limiter](https://flask-limiter.readthedocs.io/en/stable/configuration.html)          | `memory://`             |
| `--req-time-cost`               | Considers a time cost (in seconds) for request limiting purposes. If a request takes 10 seconds and this value is set to 5, the request cost is 2. | `No cost`               |
| `--batch-limit`                 | Set maximum number of texts to translate in a batch request                                                                                        | `No limit`              |
| `--frontend-language-source`    | Set frontend default language - source                                                                                                             | `auto`                  |
| `--frontend-language-target`    | Set frontend default language - target                                                                                                             | `locale`                |
| `--frontend-timeout`            | Set frontend translation timeout                                                                                                                   | `500`                   |
| `--api-keys-db-path`            | Use a specific path inside the container for the local database. Can be absolute or relative                                                       | `db/api_keys.db`        |
| `--api-keys-remote`             | Use this remote endpoint to query for valid API keys instead of using the local database                                                           | `Use local db`          |
| `--get-api-key-link`            | Show a link in the UI where to direct users to get an API key                                                                                      | `No API link displayed` |
| `--shared-storage`              | Shared storage URI to use for multi-process data sharing (e.g. when using gunicorn)                                                                | `memory://`             |
| `--secondary`                   | Mark this instance as a secondary instance to avoid conflicts with the primary node in multi-node setups                                           | `Primary`               |
| `--load-only`                   | Set available languages                                                                                                                            | `All`                   |
| `--threads`                     | Set number of threads                                                                                                                              | `4`                     |
| `--metrics-auth-token`          | Protect the /metrics endpoint by allowing only clients that have a valid Authorization Bearer token                                                | `No auth`               |
| `--url-prefix`                  | Add prefix to URL: example.com:5000/url-prefix/                                                                                                    | `/`                     |
| `--debug`                       | Enable debug environment                                                                                                                           | `Disabled`              |
| `--ssl`                         | Whether to enable SSL                                                                                                                              | `Disabled`              |
| `--api-keys`                    | Enable API keys database for per-client rate limits when --req-limit is reached                                                                    | `Disabled`              |
| `--require-api-key-origin`      | Require use of an API key for programmatic access to the API, unless the request origin matches this domain                                        | `Disabled`              |
| `--require-api-key-secret`      | Require use of an API key for programmatic access to the API, unless the client also sends a secret match                                          | `Disabled`              |
| `--require-api-key-fingerprint` | Require use of an API key for programmatic access to the API, unless the client also matches a fingerprint                                         | `Disabled`              |
| `--under-attack`                | Enable under attack mode. When enabled, requests must be made with an API key                                                                      | `Disabled`              |
| `--suggestions`                 | Allow user suggestions                                                                                                                             | `Disabled`              |
| `--disable-files-translation`   | Disable files translation                                                                                                                          | `Enabled`               |
| `--disable-web-ui`              | Disable web UI                                                                                                                                     | `Enabled`               |
| `--update-models`               | Update language models at startup                                                                                                                  | `Disabled`              |
| `--metrics`                     | Enable the /metrics endpoint for exporting [Prometheus](https://prometheus.io/) usage metrics                                                      | `Disabled`              |

:::tip
To always require the use of an API key, set `--req-limit` to `0` and add the `--api-keys` flag. Requests made without a proper API key will be rejected.
:::

Each argument has an equivalent environment variable that can be used instead. The environment variables override the default values but have lower priority than the command line arguments and are particularly useful if used with Docker. The environment variable names are the upper_snake_case of the equivalent command argument's name with a `LT` prefix. E.g. `--char-limit` --> `LT_CHAR_LIMIT`.


## Update

### Software

If you installed with pip:

`pip install -U libretranslate`

If you're using docker:

`docker pull libretranslate/libretranslate`

### Language Models

Start the program with the `--update-models` argument. For example: `libretranslate --update-models` or `./run.sh --update-models`. Setting `--update-models` will update models regardless of whether updates are available or not.

Alternatively you can also run the `scripts/install_models.py` script.


## Prometheus Metrics

LibreTranslate has Prometheus [exporter](https://prometheus.io/docs/instrumenting/exporters/) capabilities when you pass the `--metrics` argument at startup (disabled by default). When metrics are enabled, a `/metrics` endpoint is mounted on the instance:

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

You can then configure `prometheus.yml` to read the metrics:

```yaml
scrape_configs:
  - job_name: "libretranslate"

    # Needed only if you use --metrics-auth-token
    #authorization:
    #credentials: "mytoken"

    static_configs:
      - targets: ["localhost:5000"]
```

To secure the `/metrics` endpoint you can also use `--metrics-auth-token mytoken`.

If you use Gunicorn, make sure to create a directory for storing multiprocess data metrics and set `PROMETHEUS_MULTIPROC_DIR`:

```bash
mkdir -p /tmp/prometheus_data
rm /tmp/prometheus_data/*
export PROMETHEUS_MULTIPROC_DIR=/tmp/prometheus_data
gunicorn -c scripts/gunicorn_conf.py --bind 0.0.0.0:5000 'wsgi:app(metrics=True)'
```