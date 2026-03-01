---
title: "Let's Encrypt all our sites"
description: ""
pubDate: "2015-12-17T06:50:06.000Z"
heroImage: "/content/images/2015/12/SSL.png"
slug: "lets-encrypt-all-our-sites"
tags: ["DevOps"]
---

The idea that a fair share of websites which are still not using https is very concerning. Well hey, my site was HTTP only till this morning, My Reason: Why would I pay $10 a year for an SSL Certificate for serving some static content. (basically, I was being cheap), But hey this no longer needs to be the case.
Welcome to the world where [Let's Encrypt](https://letsencrypt.org) exists, Few steps and the site is SSL. If you run Apache it will even automate your web server configuration, But I use nginx so it took more than 1 step. so here's what I did.

## 1. Install Let's Encrypt
Installing is pretty straight forward

`$ git clone https://github.com/letsencrypt/letsencrypt`<br/>
`$ cd letsencrypt`

## 2. Generate SSL Certificate
For nginx, there is an experimental plugin but I am doing it manually. Nginx has to be stopped for a moment and then

`$ ./letsencrypt-auto certonly --standalone -d example.com -d www.example.com`

The certificates are generated in `/etc/letsencrypt/live/www.example.com`

## 3. Configure nginx

Update your nginx configuration. Here's mine:

```nginx
server { 
    listen 80 default_server; 
    listen [::]:80 default_server ipv6only=on;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 default_server;
    server_name example.com;
    ssl on;
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;
    ssl_session_timeout 1d;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:...";
    ssl_prefer_server_ciphers on;
    add_header Strict-Transport-Security "max-age=31536000"; 
    # ... rest of configuration
}
```

I am also redirecting all my HTTP traffic to HTTPS. Restart nginx. 

## 4. Enjoy :)
