---
layout: "../../layouts/BlogPost.astro"
title: "Minify JS within Views"
description: ""
pubDate: "2013-12-10 20:06:10"
heroImage: ""
slug: "minify-js-within-views"
---

If you want to minify the JS within views
Include this

<script src="https://gist.github.com/nareshjois/7705885.js"></script>

and then wrap your scipt

`@HTML.JsMinify()`

