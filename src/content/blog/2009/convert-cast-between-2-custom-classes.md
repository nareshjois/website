---
title: "Convert (Cast) between 2 custom classes"
description: ""
pubDate: "2009-02-19T15:40:45.000Z"
heroImage: ""
slug: "convert-cast-between-2-custom-classes"
tags: [".net"]
---

If you have ever wanted to convert (cast) between two custom classes, there is a simple way to do it:

```csharp
public partial class FinalClass
{
    public static explicit operator FinalClass(OriginalClass data)
    {
        var temp = new FinalClass();
        //do Conversion
        return temp;
    }
}

FinalClass newobj = (FinalClass)oldobj;
```
