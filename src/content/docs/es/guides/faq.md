---
title: FAQ
description: Preguntas frecuentes sobre LibreTranslate.
---

## ¿Puedo usar su servidor API en libretranslate.com para mi aplicación en producción?

En resumen, sí, [pero solo si compras una clave API](https://portal.libretranslate.com). Por supuesto, siempre puedes ejecutar LibreTranslate de forma gratuita en tu propio servidor (auto-alojado).

## Algunas traducciones en libretranslate.com son diferentes de la versión auto-alojada. ¿Por qué?

Por defecto, los modelos de lenguaje se cargan desde el [argos-index](https://github.com/argosopentech/argospm-index). A veces implementamos modelos en libretranslate.com que aún no se han agregado al argos-index, como los convertidos desde OPUS ([hilo](https://community.libretranslate.com/t/opus-mt-language-models-port-thread/757))

## ¿Dónde se guardan los modelos de lenguaje?

En `$HOME/.local/share/argos-translate/packages`. En Windows es `C:\Users\tuusuario\.local\share\argos-translate\packages`.

## ¿Cómo actualizo los modelos de lenguaje en un contenedor docker en ejecución?

```bash
docker exec -it libretranslate ./venv/bin/python scripts/install_models.py --update
```

## ¿Puedo usar LibreTranslate detrás de un proxy inverso, como Apache2 o Caddy?

Sí, aquí hay ejemplos de configuración para Apache2 y Caddy que redirigen un subdominio (con certificado HTTPS) a LibreTranslate ejecutándose en docker en localhost.

```bash
sudo docker run -ti --rm -p 127.0.0.1:5000:5000 libretranslate/libretranslate
```

Puedes eliminar `127.0.0.1` en el comando anterior si quieres poder acceder desde `dominio.tld:5000`, además de `subdominio.dominio.tld` (esto puede ser útil para determinar si hay un problema con Apache2 o con el contenedor docker).

Agrega `--restart unless-stopped` si quieres que este contenedor se inicie en el arranque, a menos que se detenga manualmente.

<details>
<summary>Configuración de Apache</summary>
<br>

Reemplaza [TU_DOMINIO] con tu dominio completo; por ejemplo, `translate.dominio.tld` o `libretranslate.dominio.tld`.

Elimina `#` en las líneas ErrorLog y CustomLog para habilitar el registro.

```ApacheConf
#Libretranslate

#Redirigir http a https
<VirtualHost *:80>
    ServerName http://[TU_DOMINIO]
    Redirect / https://[TU_DOMINIO]
    # ErrorLog ${APACHE_LOG_DIR}/error.log
    # CustomLog ${APACHE_LOG_DIR}/tr-access.log combined
 </VirtualHost>

#https
<VirtualHost *:443>
    ServerName https://[TU_DOMINIO]

    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/
    ProxyPreserveHost On

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/[TU_DOMINIO]/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/[TU_DOMINIO]/privkey.pem
    SSLCertificateChainFile /etc/letsencrypt/live/[TU_DOMINIO]/fullchain.pem

    # ErrorLog ${APACHE_LOG_DIR}/tr-error.log
    # CustomLog ${APACHE_LOG_DIR}/tr-access.log combined
</VirtualHost>
```

Agrega esto a una configuración de un sitio existente o a un nuevo archivo en `/etc/apache2/sites-available/new-site.conf` y ejecuta `sudo a2ensite new-site.conf`.

Para obtener un certificado HTTPS para un subdominio, instala `certbot` (snap), ejecuta `sudo certbot certonly --manual --preferred-challenges dns` e ingresa tu información (con `subdominio.dominio.tld` como dominio). Agrega un registro DNS TXT con tu registrador de dominios cuando se te solicite. Esto guardará tu certificado y clave en `/etc/letsencrypt/live/{subdominio.dominio.tld}/`. Alternativamente, comenta las líneas SSL si no quieres usar HTTPS.

</details>

<details>
<summary>Configuración de Caddy</summary>
<br>

Reemplaza [TU_DOMINIO] con tu dominio completo; por ejemplo, `translate.dominio.tld` o `libretranslate.dominio.tld`.

```Caddyfile
#Libretranslate
[TU_DOMINIO] {
  reverse_proxy localhost:5000
}
```

Agrega esto a un Caddyfile existente o guárdalo como `Caddyfile` en cualquier directorio y ejecuta `sudo caddy reload` en el mismo directorio.

</details>

<details>
<summary>Configuración de NGINX</summary>
<br>

Reemplaza [TU_DOMINIO] con tu dominio completo; por ejemplo, `translate.domain.tld` o `libretranslate.domain.tld`.

Elimina `#` en las líneas `access_log` y `error_log` para deshabilitar el registro.

```NginxConf
server {
  listen 80;
  server_name [TU_DOMINIO];
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 http2 ssl;
  server_name [TU_DOMINIO];

  #access_log off;
  #error_log off;

  # Sección SSL
  ssl_certificate /etc/letsencrypt/live/[TU_DOMINIO]/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/[TU_DOMINIO]/privkey.pem;

  ssl_protocols TLSv1.2 TLSv1.3;

  # Usando la suite de cifrado recomendada de: https://wiki.mozilla.org/Security/Server_Side_TLS
  ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';

  ssl_session_timeout 10m;
  ssl_session_cache shared:MozSSL:10m;  # unas 40000 sesiones
  ssl_session_tickets off;

  # Especifica una curva para los cifrados ECDHE.
  ssl_ecdh_curve prime256v1;
  # El servidor debe determinar los cifrados, no el cliente
  ssl_prefer_server_ciphers on;


  # Sección de encabezados
  add_header Strict-Transport-Security  "max-age=31536000; includeSubDomains; preload" always;
  add_header Referrer-Policy            "strict-origin" always;

  add_header X-Frame-Options            "SAMEORIGIN"    always;
  add_header X-XSS-Protection           "1; mode=block" always;
  add_header X-Content-Type-Options     "nosniff"       always;
  add_header X-Download-Options         "noopen"        always;
  add_header X-Robots-Tag               "none"          always;

  add_header Feature-Policy             "microphone 'none'; camera 'none'; geolocation 'none';"  always;
  # Encabezado más nuevo pero no compatible en todas partes
  add_header Permissions-Policy         "microphone=(), camera=(), geolocation=()" always;

  # Eliminar X-Powered-By, que es una fuga de información
  fastcgi_hide_header X-Powered-By;

  # No enviar el encabezado del servidor nginx
  server_tokens off;

  # Sección GZIP
  gzip on;
  gzip_disable "msie6";

  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_buffers 16 8k;
  gzip_http_version 1.1;
  gzip_min_length 256;
  gzip_types text/xml text/javascript font/ttf font/eot font/otf application/x-javascript application/atom+xml application/javascript application/json application/manifest+json application/rss+xml application/x-web-app-manifest+json application/xhtml+xml application/xml image/svg+xml image/x-icon text/css text/plain;

  location / {
      proxy_pass http://127.0.0.1:5000/;
      proxy_set_header Host $http_host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      client_max_body_size 0;
  }
}

```

Agrega esto a una configuración de NGINX existente o guárdalo como `libretranslate` en el directorio `/etc/nginx/site-enabled` y ejecuta `sudo nginx -s reload`.

</details>

## ¿Puedo ejecutarlo como un servicio de systemd (instalado con pip/python por defecto)?

Sí, solo crea un archivo de servicio en /etc/systemd/system y habilítalo para que se ejecute al inicio.
El archivo .env (entorno) es opcional según tu configuración.
Agrega lo siguiente al archivo (cambia los valores según sea necesario) y nombra el archivo como "libretranslate.service")

```javascript
[Unit]
Description=LibreTranslate
After=network.target
[Service]
User=root
Type=idle
Restart=always
Environment="PATH=/usr/local/lib/python3.11/dist-packages/libretranslate"
ExecStart=/usr/bin/python3 /usr/local/bin/libretranslate
EnvironmentFile=/usr/local/lib/python3.11/dist-packages/libretranslate/.env
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=1
[Install]
WantedBy=multi-user.target
```

Una vez guardado, recarga el demonio e inicia el servicio:

```javascript
systemctl daemon-reload
systemctl start libretranslate.service
systemctl enable libretranslate.service
```

## ¿Puedo hacer traducciones por lotes?

Sí, pasa un array de strings en lugar de un string al campo `q`:

```javascript
const res = await fetch("https://libretranslate.com/translate", {
  method: "POST",
  body: JSON.stringify({
    q: ["Hola", "mundo"],
    source: "en",
    target: "es",
  }),
  headers: { "Content-Type": "application/json" },
});

console.log(await res.json());
// {
//     "translatedText": [
//         "Hola",
//         "mundo"
//     ]
// }
```
