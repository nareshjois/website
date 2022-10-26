---
layout: "../../layouts/BlogPost.astro"
title: "Top 5 of Top 5 using MDX"
description: ""
pubDate: "2013-10-19T15:49:23.000Z"
heroImage: ""
slug: "top-5-of-top-5-using-mdx"
tags: ["MDX"]
---

I have been playing around with dynamic MDX Generation for the BI Application that we have been working on and one of the most asked feature was Top5 of Top5 (eg: What are my Top 5 Products Sold in Top5 Stores). While trying to figure this out we had to re-write our MDX generator, but I feel that this solution can stay in the application for a long time to come.
Anyway the solution itself is quite straight forward
Let me Give you an Example

<script src="https://gist.github.com/nareshjois/7705900.js"></script>

We Start with the Base Set , Then Continue using Cross Join for each of the dimension using the Generate Statement, The advantage of going this route is we are not limited to levels, we can do some thing like Top5 of Top5 of Top5 of Top5 (I dont think any body looks it like that)

You can also use Bottom or Modify the number as you wish.
