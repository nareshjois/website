---
layout: "../../layouts/BlogPost.astro"
title: "Let's Encrypt all our sites"
description: ""
pubDate: "2015-12-17 06:50:06"
heroImage: "__GHOST_URL__/content/images/2015/12/SSL.png"
slug: "lets-encrypt-all-our-sites"
---

![](/content/images/2015/12/SSL.png)
The idea that a fair share of websites which are still not using https is very concerning. Well hey, my site was HTTP only till this morning, My Reason: Why would I pay $10 a year for an SSL Certificate for serving some static content. (basically, I was being cheap), But hey this no longer needs to be the case.
Welcome to the world where [Let's Encrypt](https://letsencrypt.org) exists, Few steps and the site is SSL. If you run Apache it will even automate your web server configuration, But I use nginx so it took more than 1 step. so here's what I did.

#####1. Install Let's Encrypt
Installing is pretty straight forward

`$ git clone https://github.com/letsencrypt/letsencrypt`<br/>
`$ cd letsencrypt`

#####2. Generate SSL Certificate
For nginx, there is an experimental plugin but I am doing it manually. Nginx has to be stopped for a moment and then

`$ ./letsencrypt-auto certonly --standalone -d example.com -d www.example.com`

The certificates are generated in `/etc/letsencrypt/live/www.example.com`

#####3. Configure nginx

Update your nginx configuration. Here's Mine,

<script src="https://gist.github.com/nareshjois/70d01a024b38ced9e695.js"></script>

I am also redirecting all my HTTP traffic to HTTPS. Restart nginx 

#####4. Enjoy :)
