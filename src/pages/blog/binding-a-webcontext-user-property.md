---
layout: "../../layouts/BlogPost.astro"
title: "Silverlight : Binding a WebContext User Property to a DomainQueryParameter"
description: ""
pubDate: "2010-11-25T17:21:32.000Z"
heroImage: ""
slug: "binding-a-webcontext-user-property"
tags: [".net"]
---

In Domain Data Source if you want to send a parameter to the Query the simplest way to do this would be
`{Binding Path=User.Proper, Source={StaticResource WebContext}}`

Example:
<script src="https://gist.github.com/nareshjois/7863710.js"></script>
