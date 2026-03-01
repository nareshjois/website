---
title: "Minify JS within Views"
description: ""
pubDate: "2013-12-10T20:06:10.000Z"
heroImage: ""
slug: "minify-js-within-views"
tags: [".net"]
---

If you want to minify the JS within views, include this:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Ajax.Utilities;

namespace MyApp.Web.Base
{
    public static class HtmlHelperExtensions
    {
        public static MvcHtmlString JsMinify(
            this HtmlHelper helper,
            Func<object, object> markup)
        {
            string notMinifiedJs =
                (markup.DynamicInvoke(helper.ViewContext) ?? "").ToString();
#if DEBUG
            return new MvcHtmlString(notMinifiedJs);
#endif
            var minifier = new Minifier();
            var minifiedJs = minifier.MinifyJavaScript(notMinifiedJs, new CodeSettings
            {
                EvalTreatment = EvalTreatment.MakeImmediateSafe,
                PreserveImportantComments = false
            });
            return new MvcHtmlString(minifiedJs);
        }
    }
}
```

And then wrap your script with:

`@Html.JsMinify()`

