---
layout: "../../layouts/BlogPost.astro"
title: "How to make Linq distinct work for you"
description: ""
pubDate: "2008-11-28T03:28:32.000Z"
heroImage: ""
slug: "how-to-make-linq-distinct-work-for-you"
tags: [".net"]
---

Have you even tried using linq on your objects then wanted to a distinct but couldn't ?, Heres why this does not happen, .net doesn't know how to distinguish between two custome objects (even though this looks obvious in most of the cases), So what should we do ?

You have to exted the IEqualityComparer with a custom extension which would allow you to compare your custom objects

Though mine is simple, I am sure that you will make more use of this than me, Code with Example
<script src="https://gist.github.com/nareshjois/7895733.js"></script>
