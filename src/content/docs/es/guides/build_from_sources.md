---
title: Compilación desde Fuentes
description: Configuración e inicio de LibreTranslate desde las fuentes.
---

Si deseas realizar cambios en el código, puedes compilar desde las fuentes.

Instala [`hatch`](https://hatch.pypa.io) para gestionar las dependencias del proyecto y ejecutar scripts de desarrollo:

```bash
pipx install hatch
```

Clona el repositorio:

```bash
git clone https://github.com/LibreTranslate/LibreTranslate.git
cd LibreTranslate
```

Hatch instalará automáticamente las dependencias requeridas en un entorno virtual y habilitará [`pre-commit`](https://pre-commit.com/), que se ejecutará antes de cada commit para el formateo. Puedes omitir las comprobaciones de `pre-commit` al hacer commit si es necesario: `git commit --no-verify -m "Fix"`

Ejecución en modo de desarrollo:

```bash
hatch run dev --debug
```

Luego abre un navegador web en <http://localhost:5000>

También puedes iniciar un nuevo shell en un entorno virtual con libretranslate instalado:

```bash
hatch shell
libretranslate [args]
# O
python main.py [args]
```

> Todavía puedes usar `pip install -e ".[test]"` directamente si no quieres usar hatch.

## Ejecución de Pruebas

Ejecuta la suite de pruebas y las comprobaciones de linting:

```bash
hatch run test
```

Para ver todos los `print()` durante la depuración:

```bash
hatch run test -s
```

También puedes ejecutar las pruebas en múltiples versiones de python:

```bash
hatch run all:test
```

Puedes limpiar el entorno virtual con:

```bash
hatch env prune
```

## Compilación con Docker

```bash
docker build -f docker/Dockerfile [--build-arg with_models=true] -t libretranslate .
```

Si deseas ejecutar la imagen de Docker en un entorno completamente fuera de línea, debes agregar el parámetro `--build-arg with_models=true`. De esta manera, los modelos de lenguaje se descargan durante el proceso de compilación de la imagen. De lo contrario, estos modelos se descargan en el primer inicio de la imagen/contenedor.

Ejecuta la imagen compilada:

```bash
docker run -it -p 5000:5000 libretranslate [args]
```

O compila y ejecuta usando Docker Compose:

```bash
docker compose up -d --build
```

> Siéntete libre de modificar el archivo [`docker-compose.yml`](https://github.com/LibreTranslate/LibreTranslate/blob/main/docker-compose.yml) para adaptarlo a tus necesidades de implementación, o usa un archivo `docker-compose.prod.yml` adicional para tu configuración de implementación.
>
> Los modelos se almacenan dentro del contenedor en `/home/libretranslate/.local/share` y `/home/libretranslate/.local/cache`. Siéntete libre de usar volúmenes si no quieres volver a descargar los modelos cuando se destruye el contenedor. Para actualizar los modelos, usa el argumento `--update-models`.

## FAQ

### Entorno Gestionado Externamente

Algunos usuarios pueden encontrar el siguiente error al instalar paquetes:

```
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
    python3-xyz, where xyz is the package you are trying to
    install.

    …
```

Esto ocurre cuando tu sistema operativo depende de y gestiona Python para funcionalidades básicas. En este caso, deberías instalar y configurar venv (entornos virtuales) para gestionar las dependencias del proyecto.

Esto evita que los paquetes de pip se instalen a nivel de sistema. De esta manera, no hay riesgos de que los paquetes de pip entren en conflicto entre múltiples proyectos o con el sistema operativo.
