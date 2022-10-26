---
layout: "../../layouts/BlogPost.astro"
title: "Asp.net WebApi CamelCase"
description: ""
pubDate: "2013-03-11T15:39:29.000Z"
heroImage: ""
slug: "asp-net-webapi-camelcase"
tags: [".net"]
---

While Asp.net WebApi is easy to pick up and start working, the conention between C# of using Pascal Case vs using camelCase in Javascript drives me crazy, Fortunately there is a simple fix for this, all you have to do is put his in the Global.asax, this user Json.net Library.

```csharp
var index = config.Formatters.IndexOf(config.Formatters.JsonFormatter);
config.Formatters[index] = new JsonMediaTypeFormatter
    {
        SerializerSettings = new JsonSerializerSettings
                                 {
                                     ContractResolver =
                                         new CamelCasePropertyNamesContractResolver
                                         ()
                                 }
    };
```
If you are using pre MVC4 then <a href="https://gist.github.com/rdingwall/2012642">https://gist.github.com/rdingwall/2012642</a> should help
