---
layout: "../../layouts/BlogPost.astro"
title: "Minify JS within Views"
description: ""
pubDate: "2013-12-10T20:06:10.000Z"
heroImage: ""
slug: "minify-js-within-views"
tags: [".net"]
---

If you want to minify the JS within views
Include this

<script src="https://gist.github.com/nareshjois/7705885.js"></script>

and then wrap your scipt

`@HTML.JsMinify()`

