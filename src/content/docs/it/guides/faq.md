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

```nginx
#Libretranslate
server {
    listen 80;
    server_name [IL_TUO_DOMINIO];

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name [IL_TUO_DOMINIO];

    ssl_certificate /etc/letsencrypt/live/[IL_TUO_DOMINIO]/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/[IL_TUO_DOMINIO]/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Aggiungi questo a una configurazione di un sito esistente o a un nuovo file in `/etc/nginx/sites-available/new-site` ed esegui `sudo ln -s /etc/nginx/sites-available/new-site /etc/nginx/sites-enabled/` per abilitare il sito.

Per ottenere un certificato HTTPS per un sottodominio, installa `certbot` (snap), esegui `sudo certbot certonly --manual --preferred-challenges dns` e inserisci le tue informazioni (con `sottodominio.dominio.tld` come dominio). Aggiungi un record DNS TXT con il tuo registrar di domini quando richiesto. Questo salverà il tuo certificato e la chiave in `/etc/letsencrypt/live/{sottodominio.dominio.tld}/`. In alternativa, commenta le righe SSL se non vuoi usare HTTPS.

</details>
