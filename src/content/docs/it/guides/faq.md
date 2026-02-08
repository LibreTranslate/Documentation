---
title: FAQ
description: Domande frequenti su LibreTranslate.
---

## Posso usare il vostro server API su libretranslate.com per la mia applicazione in produzione?

In breve, sì, [ma solo se acquisti una chiave API](https://portal.libretranslate.com). Naturalmente, puoi sempre eseguire LibreTranslate gratuitamente sul tuo server (self-hosted).

## Alcune traduzioni su libretranslate.com sono diverse dalla versione self-hosted. Perché?

Per impostazione predefinita, i modelli linguistici vengono caricati dall'[argos-index](https://github.com/argosopentech/argospm-index). A volte distribuiamo modelli su libretranslate.com che non sono ancora stati aggiunti all'argos-index, come quelli convertiti da OPUS ([thread](https://community.libretranslate.com/t/opus-mt-language-models-port-thread/757))

## Dove vengono salvati i modelli linguistici?

In `$HOME/.local/share/argos-translate/packages`. Su Windows è `C:\Users\tuoutente\.local\share\argos-translate\packages`.

## Come aggiorno i modelli linguistici in un container docker in esecuzione?

```bash
docker exec -it libretranslate ./venv/bin/python scripts/install_models.py --update
```

## Posso usare LibreTranslate dietro un reverse proxy, come Apache2 o Caddy?

Sì, ecco esempi di configurazione per Apache2 e Caddy che reindirizzano un sottodominio (con certificato HTTPS) a LibreTranslate in esecuzione su docker su localhost.

```bash
sudo docker run -ti --rm -p 127.0.0.1:5000:5000 libretranslate/libretranslate
```

Puoi rimuovere `127.0.0.1` nel comando precedente se vuoi poter accedere da `dominio.tld:5000`, oltre a `sottodominio.dominio.tld` (questo può essere utile per determinare se c'è un problema con Apache2 o con il container docker).

Aggiungi `--restart unless-stopped` se vuoi che questo container si avvii al boot, a meno che non venga arrestato manualmente.

<details>
<summary>Configurazione Apache</summary>
<br>

Sostituisci [IL_TUO_DOMINIO] con il tuo dominio completo; ad esempio, `translate.dominio.tld` o `libretranslate.dominio.tld`.

Rimuovi `#` sulle righe ErrorLog e CustomLog per abilitare il logging.

```ApacheConf
#Libretranslate

#Reindirizza http a https
<VirtualHost *:80>
    ServerName http://[IL_TUO_DOMINIO]
    Redirect / https://[IL_TUO_DOMINIO]
    # ErrorLog ${APACHE_LOG_DIR}/error.log
    # CustomLog ${APACHE_LOG_DIR}/tr-access.log combined
 </VirtualHost>

#https
<VirtualHost *:443>
    ServerName https://[IL_TUO_DOMINIO]

    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/
    ProxyPreserveHost On

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/[IL_TUO_DOMINIO]/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/[IL_TUO_DOMINIO]/privkey.pem
    SSLCertificateChainFile /etc/letsencrypt/live/[IL_TUO_DOMINIO]/fullchain.pem

    # ErrorLog ${APACHE_LOG_DIR}/tr-error.log
    # CustomLog ${APACHE_LOG_DIR}/tr-access.log combined
</VirtualHost>
```

Aggiungi questo a una configurazione di un sito esistente o a un nuovo file in `/etc/apache2/sites-available/new-site.conf` ed esegui `sudo a2ensite new-site.conf`.

Per ottenere un certificato HTTPS per un sottodominio, installa `certbot` (snap), esegui `sudo certbot certonly --manual --preferred-challenges dns` e inserisci le tue informazioni (con `sottodominio.dominio.tld` come dominio). Aggiungi un record DNS TXT con il tuo registrar di domini quando richiesto. Questo salverà il tuo certificato e la chiave in `/etc/letsencrypt/live/{sottodominio.dominio.tld}/`. In alternativa, commenta le righe SSL se non vuoi usare HTTPS.

</details>

<details>
<summary>Configurazione Caddy</summary>
<br>

Sostituisci [IL_TUO_DOMINIO] con il tuo dominio completo; ad esempio, `translate.dominio.tld` o `libretranslate.dominio.tld`.

```Caddyfile
#Libretranslate
[IL_TUO_DOMINIO] {
  reverse_proxy localhost:5000
}
```

Aggiungi questo a un Caddyfile esistente o salvalo come `Caddyfile` in qualsiasi directory ed esegui `sudo caddy reload` nella stessa directory.

</details>

<details>
<summary>Configurazione NGINX</summary>
<br>

Sostituisci [IL_TUO_DOMINIO] con il tuo dominio completo; ad esempio, `translate.dominio.tld` o `libretranslate.dominio.tld`.

Rimuovi `#` sulle righe `access_log` e `error_log` per disabilitare il logging.

```NginxConf
server {
  listen 80;
  server_name [IL_TUO_DOMINIO];
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 http2 ssl;
  server_name [IL_TUO_DOMINIO];

  #access_log off;
  #error_log off;

  # Sezione SSL
  ssl_certificate /etc/letsencrypt/live/[IL_TUO_DOMINIO]/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/[IL_TUO_DOMINIO]/privkey.pem;

  ssl_protocols TLSv1.2 TLSv1.3;

  # Utilizzando la suite di cifratura consigliata da: https://wiki.mozilla.org/Security/Server_Side_TLS
  ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';

  ssl_session_timeout 10m;
  ssl_session_cache shared:MozSSL:10m;  # circa 40000 sessioni
  ssl_session_tickets off;

  # Specifica una curva per le cifrature ECDHE.
  ssl_ecdh_curve prime256v1;
  # Il server dovrebbe determinare le cifrature, non il client
  ssl_prefer_server_ciphers on;


  # Sezione header
  add_header Strict-Transport-Security  "max-age=31536000; includeSubDomains; preload" always;
  add_header Referrer-Policy            "strict-origin" always;

  add_header X-Frame-Options            "SAMEORIGIN"    always;
  add_header X-XSS-Protection           "1; mode=block" always;
  add_header X-Content-Type-Options     "nosniff"       always;
  add_header X-Download-Options         "noopen"        always;
  add_header X-Robots-Tag               "none"          always;

  add_header Feature-Policy             "microphone 'none'; camera 'none'; geolocation 'none';"  always;
  # Header più recente ma non supportato ovunque
  add_header Permissions-Policy         "microphone=(), camera=(), geolocation=()" always;

  # Rimuovi X-Powered-By, che è una fuga di informazioni
  fastcgi_hide_header X-Powered-By;

  # Non inviare l'header del server nginx
  server_tokens off;

  # Sezione GZIP
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

Aggiungi questo a una configurazione NGINX esistente o salvalo come `libretranslate` nella directory `/etc/nginx/site-enabled` ed esegui `sudo nginx -s reload`.

</details>

## Posso eseguirlo come systemd (quello installato con pip/python di default)?

Sì, basta creare un file di servizio in /etc/systemd/system e abilitarlo per l'avvio automatico.
Il file .env (ambiente) è opzionale in base alla tua configurazione.
Aggiungi quanto segue al file (modifica i valori secondo necessità) e nomina il file "libretranslate.service")

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

Una volta salvato, ricarica il demone e avvia il servizio:

```javascript
systemctl daemon-reload
systemctl start libretranslate.service
systemctl enable libretranslate.service
```

## Posso fare traduzioni in batch?

Sì, passa un array di stringhe invece di una stringa al campo `q`:

```javascript
const res = await fetch("https://libretranslate.com/translate", {
  method: "POST",
  body: JSON.stringify({
    q: ["Ciao", "mondo"],
    source: "en",
    target: "it",
  }),
  headers: { "Content-Type": "application/json" },
});

console.log(await res.json());
// {
//     "translatedText": [
//         "Ciao",
//         "mondo"
//     ]
// }
```
