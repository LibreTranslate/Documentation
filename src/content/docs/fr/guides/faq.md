---
title: FAQ
description: Questions fréquemment posées pour LibreTranslate.
---

## Puis-je utiliser votre serveur API sur libretranslate.com pour mon application en production ?

En bref, oui, [mais seulement si vous achetez une clé API](https://portal.libretranslate.com). Vous pouvez toujours exécuter LibreTranslate gratuitement sur votre propre serveur bien sûr.

## Certaines traductions sur libretranslate.com sont différentes de celles auto-hébergées. Pourquoi ?

Par défaut, les modèles de langue sont chargés depuis l'[index argos](https://github.com/argosopentech/argospm-index). Parfois, nous déployons des modèles sur libretranslate.com qui n'ont pas encore été ajoutés à l'index argos, comme ceux convertis depuis OPUS ([lien](https://community.libretranslate.com/t/opus-mt-language-models-port-thread/757))

## Où sont sauvegardés les modèles de langue ?

Dans `$HOME/.local/share/argos-translate/packages`. Sous Windows c'est `C:\Users\votreutilisateur\.local\share\argos-translate\packages`.

## Comment mettre à jour les modèles de langue dans un conteneur docker en cours d'exécution ?

```bash
docker exec -it libretranslate ./venv/bin/python scripts/install_models.py --update
```

## Puis-je utiliser LibreTranslate derrière un reverse proxy, comme Apache2 ou Caddy ?

Oui, voici des exemples de configuration pour Apache2 et Caddy qui redirigent un sous-domaine (avec certificat HTTPS) vers LibreTranslate fonctionnant sur un docker en localhost.

```bash
sudo docker run -ti --rm -p 127.0.0.1:5000:5000 libretranslate/libretranslate
```

Vous pouvez supprimer `127.0.0.1` dans la commande ci-dessus si vous voulez pouvoir y accéder depuis `domain.tld:5000`, en plus de `subdomain.domain.tld` (cela peut être utile pour déterminer s'il y a un problème avec Apache2 ou le conteneur docker).

Ajoutez `--restart unless-stopped` si vous voulez que ce docker démarre au démarrage, à moins d'être arrêté manuellement.

<details>
<summary>Configuration Apache</summary>
<br>

Remplacez [YOUR_DOMAIN] par votre domaine complet ; par exemple, `translate.domain.tld` ou `libretranslate.domain.tld`.

Supprimez `#` sur les lignes ErrorLog et CustomLog pour loguer les requêtes.

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

Ajoutez ceci à une configuration de site existante, ou un nouveau fichier dans `/etc/apache2/sites-available/new-site.conf` et exécutez `sudo a2ensite new-site.conf`.

Pour obtenir un certificat de sous-domaine HTTPS, installez `certbot` (snap), exécutez `sudo certbot certonly --manual --preferred-challenges dns` et entrez vos informations (avec `subdomain.domain.tld` comme domaine). Ajoutez un enregistrement DNS TXT chez votre registraire de domaine quand demandé. Cela sauvegardera votre certificat et clé dans `/etc/letsencrypt/live/{subdomain.domain.tld}/`. Alternativement, commentez les lignes SSL si vous ne voulez pas utiliser HTTPS.

</details>

<details>
<summary>Configuration Caddy</summary>
<br>

Remplacez [YOUR_DOMAIN] par votre domaine complet ; par exemple, `translate.domain.tld` ou `libretranslate.domain.tld`.

```Caddyfile
#Libretranslate
[YOUR_DOMAIN] {
  reverse_proxy localhost:5000
}
```

Ajoutez ceci à un Caddyfile existant ou sauvegardez-le comme `Caddyfile` dans n'importe quel répertoire et exécutez `sudo caddy reload` dans ce même répertoire.

</details>

<details>
<summary>Configuration NGINX</summary>
<br>

Remplacez [YOUR_DOMAIN] par votre domaine complet ; par exemple, `translate.domain.tld` ou `libretranslate.domain.tld`.

Supprimez `#` sur les lignes `access_log` et `error_log` pour désactiver les logs.

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

Ajoutez ceci à une configuration NGINX existante ou sauvegardez-la comme `libretranslate` dans le répertoire `/etc/nginx/site-enabled` et exécutez `sudo nginx -s reload`.

</details>

## Puis-je l'exécuter comme un service systemd (pip/python par défaut) ?

Oui, créez simplement un fichier de service dans /etc/systemd/system et activez-le pour s'exécuter au démarrage.
Le fichier .env (environnement) est optionnel selon votre configuration.
Ajoutez ce qui suit au fichier (changez vers vos valeurs si nécessaire) et nommez le fichier "libretranslate.service"

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

Une fois sauvegardé, rechargez le démon et démarrez le service :

```javascript
systemctl daemon-reload
systemctl start libretranslate.service
systemctl enable libretranslate.service
```

## Puis-je faire des traductions par lot ?

Oui, passez un tableau de chaînes au lieu d'une chaîne au champ `q` :

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
