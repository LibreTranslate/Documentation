---
title: Compilazione dai Sorgenti
description: Configurazione e avvio di LibreTranslate dai sorgenti.
---

Se vuoi apportare modifiche al codice, puoi compilare dai sorgenti.

Installa [`hatch`](https://hatch.pypa.io) per gestire le dipendenze del progetto ed eseguire script di sviluppo:

```bash
pipx install hatch
```

Clona il repository:

```bash
git clone https://github.com/LibreTranslate/LibreTranslate.git
cd LibreTranslate
```

Hatch installerà automaticamente le dipendenze richieste in un ambiente virtuale e abiliterà [`pre-commit`](https://pre-commit.com/), che verrà eseguito prima di ogni commit per la formattazione. Puoi ignorare i controlli di `pre-commit` durante il commit, se necessario: `git commit --no-verify -m "Fix"`

Esecuzione in modalità sviluppo:

```bash
hatch run dev --debug
```

Quindi apri un browser web su <http://localhost:5000>

Puoi anche avviare una nuova shell in un ambiente virtuale con libretranslate installato:

```bash
hatch shell
libretranslate [args]
# O
python main.py [args]
```

> Puoi ancora usare `pip install -e ".[test]"` direttamente se non vuoi usare hatch.

## Esecuzione dei test

Esegui la suite di test e i controlli di linting:

```bash
hatch run test
```

Per visualizzare tutti i `print()` durante il debug:

```bash
hatch run test -s
```

Puoi anche eseguire i test su più versioni di python:

```bash
hatch run all:test
```

Puoi pulire l'ambiente virtuale con:

```bash
hatch env prune
```

## Compilazione con Docker

```bash
docker build -f docker/Dockerfile [--build-arg with_models=true] -t libretranslate .
```

Se vuoi eseguire l'immagine Docker in un ambiente completamente offline, devi aggiungere il parametro `--build-arg with_models=true`. In questo modo i modelli linguistici vengono scaricati durante il processo di build dell'immagine. Altrimenti, questi modelli vengono scaricati al primo avvio dell'immagine/container.

Esegui l'immagine compilata:

```bash
docker run -it -p 5000:5000 libretranslate [args]
```

Oppure compila ed esegui usando Docker Compose:

```bash
docker compose up -d --build
```

> Sentiti libero di modificare il file [`docker-compose.yml`](https://github.com/LibreTranslate/LibreTranslate/blob/main/docker-compose.yml) per adattarlo alle tue esigenze di distribuzione, o usa un file `docker-compose.prod.yml` aggiuntivo per la tua configurazione di distribuzione.
>
> I modelli sono archiviati all'interno del container in `/home/libretranslate/.local/share` e `/home/libretranslate/.local/cache`. Sentiti libero di usare i volumi se non vuoi riscaricare i modelli quando il container viene distrutto. Per aggiornare i modelli, usa l'argomento `--update-models`.

## FAQ

### Ambiente Gestito Esternamente

Alcuni utenti potrebbero riscontrare il seguente errore durante l'installazione dei pacchetti:

```
error: externally-managed-environment
```
