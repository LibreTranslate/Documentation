---
title: Contribuer
description: Comment contribuer à LibreTranslate.
---

Nous accueillons les contributions ! Voici quelques façons de contribuer au projet :

## Financièrement

Vous pouvez soutenir le projet financièrement en obtenant une [clé API](https://portal.libretranslate.com) et/ou en soutenant les librairies en amont comme [argos-translate](https://github.com/argosopentech/argos-translate) en visitant leur [page de sponsoring](https://github.com/sponsors/argosopentech).

## En nature

### Documentation

Vous pouvez nous aider à améliorer cette [documentation](https://github.com/LibreTranslate/Documentation) ou [la traduire](https://github.com/LibreTranslate/Documentation/#translation).

### Interface Web

L'[interface Web](https://libretranslate.com) LibreTranslate est disponible dans toutes les langues vers lesquelles LibreTranslate peut traduire. Elle peut également (approximativement) [se traduire elle-même !](https://github.com/LibreTranslate/LibreTranslate/blob/main/scripts/update_locales.py). Certaines langues peuvent ne pas apparaître dans l'interface utilisateur car elles n'ont pas encore été revues par un humain. Vous pouvez activer toutes les langues en activant le mode `--debug`.

Vous pouvez nous aider à améliorer ou revoir les traductions de l'interface utilisateur :

- Allez sur <https://hosted.weblate.org/projects/libretranslate/app/#translations>. Toutes les modifications sont automatiquement poussées vers le dépôt.
- Une fois que toutes les chaînes ont été revues/éditées, ouvrez une pull request et modifiez `libretranslate/locales/{code}/meta.json` ou faites-le nous savoir sur le [forum communautaire](https://community.libretranslate.com) quelle langue vous avez revue et nous le ferons pour vous :

```json
{
 "name": "<Language>",
 "reviewed": true <-- Changez ceci de false à true
}
```

### Tâches de développement

- Vous pouvez entraîner un nouveau modèle de langue en utilisant [Locomotive](https://github.com/LibreTranslate/Locomotive). Par exemple, nous voulons entraîner des réseaux neuronaux améliorés pour l'[allemand](https://community.libretranslate.com/t/help-wanted-improve-en-de-translation/935) et de nombreuses autres langues.
- Pouvez-vous battre les performances de nos modèles de langue ? Entraînez-en un nouveau et comparons-le. Pour soumettre votre modèle, faites un message sur le [forum communautaire](https://community.libretranslate.com/) avec un lien pour télécharger votre fichier .argosmodel et un exemple de texte que votre modèle a traduit.
- Aidez-nous à corriger un [problème](https://github.com/LibreTranslate/LibreTranslate/issues) existant.
- Ajoutez une nouvelle fonctionnalité qui vous est utile. Si vous n'êtes pas sûr, ouvrez d'abord une discussion sur notre [forum communautaire](https://community.libretranslate.com/).
