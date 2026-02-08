---
title: Contribuire
description: Come contribuire a LibreTranslate.
---

Accogliamo con favore i contributi! Ecco alcuni modi per contribuire al progetto:

## Finanziariamente

Puoi sostenere finanziariamente il progetto acquistando una [chiave API](https://portal.libretranslate.com) e/o sostenere le librerie a monte come [argos-translate](https://github.com/argosopentech/argos-translate) visitando la loro [pagina di sponsorizzazione](https://github.com/sponsors/argosopentech).

## Contributi non monetari

### Documentazione

Puoi aiutarci a migliorare questa [documentazione](https://github.com/LibreTranslate/Documentation) o a [tradurla](https://github.com/LibreTranslate/Documentation/#translation).

### Interfaccia Utente Web

L'[interfaccia utente web](https://libretranslate.com) di LibreTranslate è disponibile in tutte le lingue supportate da LibreTranslate. Può anche (approssimativamente) [tradurre se stessa!](https://github.com/LibreTranslate/LibreTranslate/blob/main/scripts/update_locales.py) Alcune lingue potrebbero non apparire nell'interfaccia utente poiché non sono ancora state revisionate da un essere umano. Puoi abilitare tutte le lingue attivando la modalità `--debug`.

Puoi aiutarci a migliorare o revisionare le traduzioni dell'interfaccia utente:

- Vai su <https://hosted.weblate.org/projects/libretranslate/app/#translations>. Tutte le modifiche vengono inviate automaticamente al repository.
- Una volta che tutte le stringhe sono state revisionate/modificate, apri una pull request e modifica `libretranslate/locales/{code}/meta.json` o facci sapere nel [forum della comunità](https://community.libretranslate.com) quale lingua hai revisionato e lo faremo per te:

```json
{
 "name": "<Lingua>",
 "reviewed": true <-- Cambia da false a true
}
```

### Attività di Sviluppo

- Puoi addestrare un nuovo modello linguistico usando [Locomotive](https://github.com/LibreTranslate/Locomotive). Ad esempio, vogliamo addestrare reti neurali migliorate per il [tedesco](https://community.libretranslate.com/t/help-wanted-improve-en-de-translation/935) e molte altre lingue.
- Riesci a superare le prestazioni dei nostri modelli linguistici? Addestrane uno nuovo e confrontiamolo. Per inviare il tuo modello, pubblica un post sul [forum della comunità](https://community.libretranslate.com/) con un link per scaricare il tuo file .argosmodel e un testo di esempio tradotto dal tuo modello.
- Aiutaci a risolvere un [problema](https://github.com/LibreTranslate/LibreTranslate/issues) esistente.
- Aggiungi una nuova funzionalità che ti è utile. Se non sei sicuro, apri una discussione sul nostro [forum della comunità](https://community.libretranslate.com/) prima.
