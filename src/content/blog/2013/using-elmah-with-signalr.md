---
title: "Using Elmah with SignalR"
description: ""
pubDate: "2013-07-29T16:14:35.000Z"
heroImage: ""
slug: "using-elmah-with-signalr"
tags: [".net"]
---

SignalR is one of the easiest frameworks to get started with, and we have started using it a lot lately. The only thing that was missing was integration with Elmah, but the pipelining makes it a lot easier. All you have to do is introduce this and update Global.asax to reflect:

**ElmahPipelineModule.cs:**
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using Elmah;
using Microsoft.AspNet.SignalR.Hubs;

namespace ErrorLogger
{
    public class ElmahPipelineModule : HubPipelineModule
    {
        private static bool RaiseErrorSignal(Exception e)
        {
            var context = HttpContext.Current;
            if (context == null)
                return false;
            var signal = ErrorSignal.FromContext(context);
            if (signal == null)
                return false;
            signal.Raise(e, context);
            return true;
        }

        private static void LogException(Exception e, IHubIncomingInvokerContext invokerContext)
        {
            var context = HttpContext.Current;
            ErrorLog el = ErrorLog.GetDefault(context);
            el.Log(new Error(e));
        }

        protected override void OnIncomingError(Exception ex, IHubIncomingInvokerContext context)
        {
            var exception = ex;
            if (ex is TargetInvocationException)
                exception = ex.InnerException;
            else if (ex is AggregateException)
                exception = ex.InnerException;

            if (!RaiseErrorSignal(exception))
                LogException(exception, context);
        }
    }
}
```

**Global.asax.cs:**
```csharp
protected void Application_Start()
{
    GlobalHost.HubPipeline.AddModule(new ElmahPipelineModule()); 
    RouteTable.Routes.MapHubs(new HubConfiguration { EnableDetailedErrors = true });
}
```

Here `EnableDetailedErrors = true` is optional.
