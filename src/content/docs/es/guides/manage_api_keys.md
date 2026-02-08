---
title: Gestión de Claves API
description: Aprende a emitir y gestionar Claves API.
---

:::tip[Esta información es para instancias auto-alojadas]
Si necesitas una Clave API para [libretranslate.com](https://libretranslate.com), debes comprarla [aquí](https://portal.libretranslate.com).
:::

## Gestión de Claves API

LibreTranslate admite cuotas de límite por usuario, por ejemplo, puedes emitir claves API a los usuarios para que puedan disfrutar de límites de solicitudes más altos por minuto (si también estableces `--req-limit`). Por defecto, todos los usuarios están limitados según `--req-limit`, pero pasar un parámetro `api_key` opcional a los puntos finales REST permite a un usuario disfrutar de límites de solicitud más altos. También puedes especificar diferentes límites de caracteres que anulan el valor predeterminado de `--char-limit` para cada clave.

Para usar las claves API, simplemente inicia LibreTranslate con la opción `--api-keys`. Si has cambiado la ruta de la base de datos de claves API con la opción `--api-keys-db-path`, debes especificar la ruta con el mismo indicador cuando uses el comando `ltmanage keys`.

### Añadir Nueva Clave

Para emitir una nueva clave API con un límite de 120 solicitudes por minuto:

```bash
ltmanage keys add 120
```

Para emitir una nueva clave API con 120 solicitudes por minuto y un máximo de 5.000 caracteres por solicitud:

```bash
ltmanage keys add 120 --char-limit 5000
```

Si has cambiado la ruta de la base de datos de claves API:

```bash
ltmanage keys --api-keys-db-path path/to/db/dbName.db add 120
```

### Eliminar Claves

```bash
ltmanage keys remove <api-key>
```

### Ver Claves

```bash
ltmanage keys
```
