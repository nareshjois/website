---
layout: "../../layouts/BlogPost.astro"
title: "Update Date Columns with specific intervals"
description: ""
pubDate: "2012-11-07 13:48:00"
heroImage: ""
slug: "update-date-columns-with-specific-intervals"
---

There are cases when you want to modify the entire date values and add a specific interval say add and Year, The easiest way to do that is
`update [Table] set ColumnName= DATEADD(YEAR,1,ColumnName)`

