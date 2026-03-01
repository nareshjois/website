---
title: "Top 5 of Top 5 using MDX"
description: ""
pubDate: "2013-10-19T15:49:23.000Z"
heroImage: ""
slug: "top-5-of-top-5-using-mdx"
tags: ["MDX"]
---

I have been playing around with dynamic MDX generation for the BI application that we have been working on, and one of the most asked features was Top 5 of Top 5 (e.g., What are my Top 5 Products Sold in Top 5 Stores?). While trying to figure this out we had to re-write our MDX generator, but I feel that this solution can stay in the application for a long time to come.

Anyway, the solution itself is quite straightforward. Let me give you an example:

```sql
With
Set [Set0] as 
{
    [Date].[Month].[August 2013],
    [Date].[Month].[September 2013],
    [Date].[Month].[October 2013] 
}
Set [Set1] as generate([Set0],CROSSJOIN([Set0].Current,TopCount([Product].[Description].Children,5,[Measures].[Sales Revenue])))
Set [Set2] as generate([Set1],CROSSJOIN([Set1].Current,TopCount([Outlet].[Name].Children,5,[Measures].[Sales Revenue])))
Select 
    [Measures].[Sales Revenue] ON 0,
    [Set2] on 1
from [Sales]
```

We start with the base set, then continue using CROSSJOIN for each of the dimensions using the Generate statement. The advantage of going this route is we are not limited to levels - we can do something like Top 5 of Top 5 of Top 5 of Top 5 (I don't think anybody looks at it like that).

You can also use Bottom or modify the number as you wish.
