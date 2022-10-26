---
layout: "../../layouts/BlogPost.astro"
title: "Using Elmah with SignalR"
description: ""
pubDate: "2013-07-29T16:14:35.000Z"
heroImage: ""
slug: "using-elmah-with-signalr"
tags: [".net"]
---

SinglarR is one the easiest frameworks to get started with, and we have started using it a lot lately. The Only thing that was missing is to integration with Elmah, but the pipelining makes it lot easier, All you have to do is introduce this and update Global.asax to reflect
<script src="https://gist.github.com/nareshjois/6102729.js"></script>
here EnableDetailedErrors = true  is optional.
