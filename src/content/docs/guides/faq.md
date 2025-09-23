---
title: FAQ
description: Frequently asked questions for LibreTranslate.
---

## Can I use your API server at libretranslate.com for my application in production?

In short, yes, [but only if you buy an API key](https://portal.libretranslate.com). You can always run LibreTranslate for free on your own server of course.

## Some translations on libretranslate.com are different than the self-hosted ones. Why?

By default language models are loaded from the [argos-index](https://github.com/argosopentech/argospm-index). Sometimes we deploy models on libretranslate.com that haven't been added to the argos-index yet, such as those converted from OPUS ([thread](https://community.libretranslate.com/t/opus-mt-language-models-port-thread/757))

## Where are the language models saved?

In `$HOME/.local/share/argos-translate/packages`. On Windows that's `C:\Users\youruser\.local\share\argos-translate\packages`.

## Can I use LibreTranslate behind a reverse proxy, like Apache2 or Caddy?

Yes, here are config examples for Apache2 and Caddy that redirect a subdomain (with HTTPS certificate) to LibreTranslate running on a docker at localhost.

```bash
sudo docker run -ti --rm -p 127.0.0.1:5000:5000 libretranslate/libretranslate
```

You can remove `127.0.0.1` on the above command if you want to be able to access it from `domain.tld:5000`, in addition to `subdomain.domain.tld` (this can be helpful to determine if there is an issue with Apache2 or the docker container).

Add `--restart unless-stopped` if you want this docker to start on boot, unless manually stopped.

<details>
<summary>Apache config</summary>
<br>

Replace [YOUR_DOMAIN] with your full domain; for example, `translate.domain.tld` or `libretranslate.domain.tld`.

Remove `#` on the ErrorLog and CustomLog lines to log requests.

```ApacheConf
#Libretranslate

#Redirect http to https
<VirtualHost *:80>
    ServerName http://[YOUR_DOMAIN]
    Redirect / https://[YOUR_DOMAIN]
    # ErrorLog ${APACHE_LOG_DIR}/error.log
    # CustomLog ${APACHE_LOG_DIR}/tr-access.log combined
 </VirtualHost>

#https
<VirtualHost *:443>
    ServerName https://[YOUR_DOMAIN]

    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/
    ProxyPreserveHost On

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/[YOUR_DOMAIN]/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/[YOUR_DOMAIN]/privkey.pem
    SSLCertificateChainFile /etc/letsencrypt/live/[YOUR_DOMAIN]/fullchain.pem

    # ErrorLog ${APACHE_LOG_DIR}/tr-error.log
    # CustomLog ${APACHE_LOG_DIR}/tr-access.log combined
</VirtualHost>
```

Add this to an existing site config, or a new file in `/etc/apache2/sites-available/new-site.conf` and run `sudo a2ensite new-site.conf`.

To get a HTTPS subdomain certificate, install `certbot` (snap), run `sudo certbot certonly --manual --preferred-challenges dns` and enter your information (with `subdomain.domain.tld` as the domain). Add a DNS TXT record with your domain registrar when asked. This will save your certificate and key to `/etc/letsencrypt/live/{subdomain.domain.tld}/`. Alternatively, comment the SSL lines out if you don't want to use HTTPS.

</details>

<details>
<summary>Caddy config</summary>
<br>

Replace [YOUR_DOMAIN] with your full domain; for example, `translate.domain.tld` or `libretranslate.domain.tld`.

```Caddyfile
#Libretranslate
[YOUR_DOMAIN] {
  reverse_proxy localhost:5000
}
```

Add this to an existing Caddyfile or save it as `Caddyfile` in any directory and run `sudo caddy reload` in that same directory.

</details>

<details>
<summary>NGINX config</summary>
<br>

Replace [YOUR_DOMAIN] with your full domain; for example, `translate.domain.tld` or `libretranslate.domain.tld`.

Remove `#` on the `access_log` and `error_log` lines to disable logging.

```NginxConf
server {
  listen 80;
  server_name [YOUR_DOMAIN];
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 http2 ssl;
  server_name [YOUR_DOMAIN];

  #access_log off;
  #error_log off;

  # SSL Section
  ssl_certificate /etc/letsencrypt/live/[YOUR_DOMAIN]/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/[YOUR_DOMAIN]/privkey.pem;

  ssl_protocols TLSv1.2 TLSv1.3;

  # Using the recommended cipher suite from: https://wiki.mozilla.org/Security/Server_Side_TLS
  ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';

  ssl_session_timeout 10m;
  ssl_session_cache shared:MozSSL:10m;  # about 40000 sessions
  ssl_session_tickets off;

  # Specifies a curve for ECDHE ciphers.
  ssl_ecdh_curve prime256v1;
  # Server should determine the ciphers, not the client
  ssl_prefer_server_ciphers on;


  # Header section
  add_header Strict-Transport-Security  "max-age=31536000; includeSubDomains; preload" always;
  add_header Referrer-Policy            "strict-origin" always;

  add_header X-Frame-Options            "SAMEORIGIN"    always;
  add_header X-XSS-Protection           "1; mode=block" always;
  add_header X-Content-Type-Options     "nosniff"       always;
  add_header X-Download-Options         "noopen"        always;
  add_header X-Robots-Tag               "none"          always;

  add_header Feature-Policy             "microphone 'none'; camera 'none'; geolocation 'none';"  always;
  # Newer header but not everywhere supported
  add_header Permissions-Policy         "microphone=(), camera=(), geolocation=()" always;

  # Remove X-Powered-By, which is an information leak
  fastcgi_hide_header X-Powered-By;

  # Do not send nginx server header
  server_tokens off;

  # GZIP Section
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

Add this to an existing NGINX config or save it as `libretranslate` in the `/etc/nginx/site-enabled` directory and run `sudo nginx -s reload`.

</details>

## Can I run it as a systemd (default pip/python installed one)?

Yes, just create a service file in /etc/systemd/system and enable it to run at startup.
The .env (environmant) file is optional based on your setup.
Add the below to the file (change to your values as necessary) and name the file as "libretranslate.service)

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

Once saved, reload the daemon & start the service:

```javascript
systemctl daemon-reload
systemctl start libretranslate.service
systemctl enable libretranslate.service
```

## Can I do batch translations?

Yes, pass an array of strings instead of a string to the `q` field:

```javascript
const res = await fetch("https://libretranslate.com/translate", {
  method: "POST",
  body: JSON.stringify({
    q: ["Hello", "world"],
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
