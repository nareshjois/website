---
layout: "../../layouts/BlogPost.astro"
title: "Silverlight : Binding a WebContext User Property to a DomainQueryParameter"
description: ""
pubDate: "2010-11-25 17:21:32"
heroImage: ""
slug: "binding-a-webcontext-user-property"
---

In Domain Data Source if you want to send a parameter to the Query the simplest way to do this would be
`{Binding Path=User.Proper, Source={StaticResource WebContext}}`

Example:
<script src="https://gist.github.com/nareshjois/7863710.js"></script>
