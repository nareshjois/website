---
title: "Using Linq to Find a Control"
description: ""
pubDate: "2010-10-29T16:34:04.000Z"
heroImage: ""
slug: "using-linq-to-find-a-control"
tags: [".net"]
---

I think everyone has at one time or another tried to find a control by looping over and finding the required control, but we can use LINQ to do the same thing:

```csharp
public static class PageExtensions
{
    public static IEnumerable<Control> All(this ControlCollection controls)
    {
        foreach (Control control in controls)
        {
            foreach (Control grandChild in control.Controls.All())
                yield return grandChild;

            yield return control;
        }
    }
}
```

Then you can use it as a LINQ expression:

```csharp
var ctrls = controls.All().Where(c => c.GetType() == typeof(Button));
```

