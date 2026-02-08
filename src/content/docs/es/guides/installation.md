---
title: Instalación
description: Ponte en marcha con LibreTranslate.
---

## Con Python

Asegúrate de tener Python >= 3.8 instalado, luego desde una terminal ejecuta:

```bash
pip install libretranslate
libretranslate [args]
```

Luego abre un navegador web en <http://localhost:5000>

Por defecto, LibreTranslate instalará el soporte para todos los idiomas disponibles. Para cargar solo algunos idiomas y reducir los tiempos de inicio, puedes usar el argumento `--load-only`:

```bash
libretranslate --load-only en,es,fr
```

Consulta la lista de [argumentos](#arguments) para más opciones.

:::note
En producción se recomienda ejecutar LibreTranslate con Gunicorn o Docker (que está configurado con Gunicorn) para evitar fugas de memoria.
:::

Para usar el detector de límites de oración más rápido ([MiniSBD](https://github.com/LibreTranslate/MiniSBD)) usa:

```bash
ARGOS_CHUNK_TYPE=MINISBD libretranslate [...]
```

## Con Docker

También puedes ejecutar la aplicación con [docker](https://docker.com). Primero clona el repositorio:

```bash
git clone https://github.com/LibreTranslate/LibreTranslate
cd LibreTranslate
```

Luego en Linux/macOS ejecuta `./run.sh [args]`, en Windows ejecuta `run.bat [args]`.

:::note
La versión de docker utiliza MiniSBD para la detección de límites de oración por defecto. Puedes anular esto modificando run.sh o run.bat y estableciendo una variable de entorno de docker `-e ARGOS_CHUNK_TYPE=STANZA`.
:::

### CUDA

Es posible usar la aceleración de hardware para acelerar las traducciones en una máquina GPU con CUDA 12.4.1 y [nvidia-docker](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) instalado.

Ejecuta esta versión con:

```bash
docker compose -f docker-compose.cuda.yml up -d --build
```

## Con WSGI y Gunicorn

```bash
pip install gunicorn
gunicorn --bind 0.0.0.0:5000 'wsgi:app()'
```

Puedes pasar los argumentos de la aplicación directamente a Gunicorn a través de:

```bash
gunicorn --bind 0.0.0.0:5000 'wsgi:app(api_keys=True)'
```

## Con Kubernetes

Consulta el [artículo de Medium de JM Robles](https://jmrobles.medium.com/libretranslate-your-own-translation-service-on-kubernetes-b46c3e1af630) y el [k8s.yaml](https://github.com/LibreTranslate/LibreTranslate/blob/main/k8s.yaml) mejorado por @rasos.

### Gráfico de Helm

Basado en el trabajo de @rasos, ahora puedes instalar LibreTranslate en Kubernetes usando Helm.

Un gráfico de Helm ahora está disponible en el repositorio [helm-chart](https://github.com/LibreTranslate/helm-chart/) donde puedes encontrar más detalles.

Puedes instalar rápidamente LibreTranslate en Kubernetes usando Helm con el siguiente comando:

```bash
helm repo add libretranslate https://libretranslate.github.io/helm-chart/
helm repo update
helm search repo libretranslate

helm install libretranslate libretranslate/libretranslate --namespace libretranslate --create-namespace
```

## Argumentos

| Argumento | Descripción | Predeterminado |
| --- | --- | --- |
| `--host` | Establece el host al que se asociará el servidor | `127.0.0.1` |
| `--port` | Establece el puerto al que se asociará el servidor | `5000` |
| `--char-limit` | Establece el límite de caracteres | `Sin límite` |
| `--req-limit` | Establece el número máximo de solicitudes por minuto por cliente (fuera de los límites establecidos por las claves api) | `Sin límite` |
| `--req-limit-storage` | URI de almacenamiento para los datos de límite de solicitudes. Ver [Flask Limiter](https://flask-limiter.readthedocs.io/en/stable/configuration.html) | `memory://` |
| `--req-time-cost` | Considera un costo de tiempo (en segundos) para limitar las solicitudes. Si una solicitud tarda 10 segundos y este valor se establece en 5, el costo de la solicitud es 2. | `Sin costo` |
| `--batch-limit` | Establece el número máximo de textos a traducir en una solicitud por lotes | `Sin límite` |
| `--frontend-language-source` | Establece el idioma predeterminado del frontend - origen | `auto` |
| `--frontend-language-target` | Establece el idioma predeterminado del frontend - destino | `locale` |
| `--frontend-timeout` | Establece el tiempo de espera de la traducción del frontend | `500` |
| `--api-keys-db-path` | Usa una ruta específica dentro del contenedor para la base de datos local. Puede ser absoluta o relativa | `db/api_keys.db` |
| `--api-keys-remote` | Usa este punto final remoto para consultar claves API válidas en lugar de usar la base de datos local | `Usa la BD local` |
| `--get-api-key-link` | Muestra un enlace en la interfaz de usuario para dirigir a los usuarios a obtener una clave API | `No se muestra enlace de API` |
| `--shared-storage` | URI de almacenamiento compartido para el intercambio de datos entre procesos (por ejemplo, al usar gunicorn) | `memory://` |
| `--secondary` | Marca esta instancia como secundaria para evitar conflictos con el nodo primario en configuraciones de varios nodos | `Primario` |
| `--load-only` | Establece los idiomas disponibles | `Todos` |
| `--threads` | Establece el número de hilos | `4` |
| `--metrics-auth-token` | Protege el punto final /metrics permitiendo solo clientes que tengan un token de autorización Bearer válido | `Sin autenticación` |
| `--url-prefix` | Agrega un prefijo a la URL: ejemplo.com:5000/prefijo-url/ | `/` |
| `--debug` | Habilita el entorno de depuración | `Deshabilitado` |
| `--ssl` | Habilita SSL | `Deshabilitado` |
| `--api-keys` | Habilita la base de datos de claves API para límites de tasa por cliente cuando se alcanza --req-limit | `Deshabilitado` |
| `--require-api-key-origin` | Requiere el uso de una clave API para el acceso programático a la API, a menos que el origen de la solicitud coincida con este dominio | `Deshabilitado` |
| `--require-api-key-secret` | Requiere el uso de una clave API para el acceso programático a la API, a menos que el cliente también envíe un secreto coincidente | `Deshabilitado` |
| `--require-api-key-fingerprint` | Requiere el uso de una clave API para el acceso programático a la API, a menos que el cliente también coincida con una huella digital | `Deshabilitado` |
| `--under-attack` | Habilita el modo bajo ataque. Cuando está habilitado, las solicitudes deben realizarse con una clave API | `Deshabilitado` |
| `--suggestions` | Permite sugerencias de los usuarios | `Deshabilitado` |
| `--disable-files-translation` | Deshabilita la traducción de archivos | `Habilitado` |
| `--disable-web-ui` | Deshabilita la interfaz de usuario web | `Habilitado` |
| `--update-models` | Actualiza los modelos de lenguaje al inicio | `Deshabilitado` |
| `--metrics` | Habilita el punto final /metrics para exportar métricas de uso de [Prometheus](https://prometheus.io/) | `Deshabilitado` |
| `--translation-cache` | Almacena en caché la salida de la traducción para usuarios con una clave API particular (o 'all' para almacenar en caché todas las traducciones) | `Deshabilitado` |

:::tip
Para requerir siempre el uso de una clave API, establece `--req-limit` en `0` y agrega la bandera `--api-keys`. Las solicitudes realizadas sin una clave API adecuada serán rechazadas.
:::

Cada argumento tiene una variable de entorno equivalente que se puede usar en su lugar. Las variables de entorno anulan los valores predeterminados pero tienen una prioridad más baja que los argumentos de la línea de comandos y son particularmente útiles si se usan con Docker. Los nombres de las variables de entorno son el upper_snake_case del nombre del argumento de comando equivalente con un prefijo `LT`. Por ejemplo, `--char-limit` --> `LT_CHAR_LIMIT`.


## Actualización

### Software

Si instalaste con pip:

`pip install -U libretranslate`

Si estás usando docker:

`docker pull libretranslate/libretranslate`

### Modelos de Lenguaje

Inicia el programa con el argumento `--update-models`. Por ejemplo: `libretranslate --update-models` o `./run.sh --update-models`. Establecer `--update-models` actualizará los modelos independientemente de si hay actualizaciones disponibles o no.

Alternativamente, también puedes ejecutar el script `scripts/install_models.py`.


## Métricas de Prometheus

LibreTranslate tiene capacidades de [exportador](https://prometheus.io/docs/instrumenting/exporters/) de Prometheus cuando pasas el argumento `--metrics` al inicio (deshabilitado por defecto). Cuando las métricas están habilitadas, se monta un punto final `/metrics` en la instancia:

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

Luego puedes configurar `prometheus.yml` para leer las métricas:

```yaml
scrape_configs:
  - job_name: "libretranslate"

    # Necesario solo si usas --metrics-auth-token
    #authorization:
    #credentials: "mytoken"

    static_configs:
      - targets: ["localhost:5000"]
```

Para proteger el punto final `/metrics` también puedes usar `--metrics-auth-token mytoken`.

Si usas Gunicorn, asegúrate de crear un directorio para almacenar los datos de métricas multiproceso y establecer `PROMETHEUS_MULTIPROC_DIR`:

```bash
mkdir -p /tmp/prometheus_data
rm /tmp/prometheus_data/*
export PROMETHEUS_MULTIPROC_DIR=/tmp/prometheus_data
gunicorn -c scripts/gunicorn_conf.py --bind 0.0.0.0:5000 'wsgi:app(metrics=True)'
```
