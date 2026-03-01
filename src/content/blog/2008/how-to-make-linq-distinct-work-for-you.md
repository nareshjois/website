---
title: "How to make Linq distinct work for you"
description: ""
pubDate: "2008-11-28T03:28:32.000Z"
heroImage: ""
slug: "how-to-make-linq-distinct-work-for-you"
tags: [".net"]
---

Have you ever tried using LINQ on your objects then wanted to use distinct but couldn't? Here's why this does not happen: .NET doesn't know how to distinguish between two custom objects (even though this looks obvious in most of the cases). So what should we do?

You have to extend the IEqualityComparer with a custom extension which would allow you to compare your custom objects.

Though mine is simple, I am sure that you will make more use of this than me. Code with example:

```csharp
class Comparer : IEqualityComparer 
{
    public bool Equals(GridDetails x, GridDetails y)
    {
        return x.Name == y.Name;
    }

    public int GetHashCode(GridDetails obj)
    {
        return obj.Name.GetHashCode();
    }
}
```

```csharp
this.grid.DataSource = data.ToList().Distinct(new Comparer());
```
