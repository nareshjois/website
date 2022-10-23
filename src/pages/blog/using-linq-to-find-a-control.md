---
layout: "../../layouts/BlogPost.astro"
title: "Using Linq to Find a Control"
description: ""
pubDate: "2010-10-29 16:34:04"
heroImage: ""
slug: "using-linq-to-find-a-control"
---

I think Every one has one time or the other tried to find a control by looping over and find the required control, but we can use Linq to do the same thing.
<script src="https://gist.github.com/nareshjois/7863727.js"></script>
Then you can use as a Linq Expression

`var ctrls = controls.All().Where(c => c.GetType() == typeof(Button));`

