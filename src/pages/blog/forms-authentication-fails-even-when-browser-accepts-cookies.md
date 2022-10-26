---
layout: "../../layouts/BlogPost.astro"
title: "Forms Authentication fails even when browser accepts cookies"
description: ""
pubDate: "2010-06-15T12:13:11.000Z"
heroImage: ""
slug: "forms-authentication-fails-even-when-browser-accepts-cookies"
tags: [".net"]
---

While using Forms authentication in ASP.net 
<script src="https://gist.github.com/nareshjois/7896580.js"></script>
please remeber to set path = "/" or else the cookie based authentication fails, I am yet to figure out why this is happening but atleast this solves the problem.
