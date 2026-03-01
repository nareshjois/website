---
title: "Mix and Mash Asp.net MVC with Webforms"
description: ""
pubDate: "2010-10-29T13:18:26.000Z"
heroImage: ""
slug: "mix-asp-net-mvc-with-webforms"
tags: [".net"]
---

A lot of people including me wanted to get on the bandwagon of ASP.net MVC, but the main problem is we do not always get to start new projects and there is always a timeline hanging. I will not talk about the benefits of MVC Pattern as most of us are already aware of it. But for an ASP.net Developer where everything is tied up in Webforms this may seem difficult, but once you start taking advantage of this pattern, the usefulness becomes obvious. Having worked on Rails and PHP frameworks such as CodeIgniter and CakePHP, it was never a question of if, but when, and the best way to begin would be to use your existing skills with webforms and start bringing in MVC Pattern, and before you know it you can be completely taking the benefits out of both worlds.

## Webforms with MVC
If you are starting with a new project it's really simple. Start off with a new MVC Project in Visual Studio, add a new Webform, run it and that's it - no configuration required. The reason is that because MVC Framework is built on top of the same ASP.NET platform, it runs. And the reason why the routing doesn't try and hijack this request is because of the way it works: if the physical file of the request exists, the request is always made to the aspx file. For better performance and to save disk query on each .aspx request, you can also add the following line in your global.asax:

**Global.asax.cs:**
```csharp
public static void RegisterRoutes(RouteCollection routes)
{
    routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
    routes.IgnoreRoute("{resource}.aspx/{*pathInfo}");

    routes.MapRoute(
        "Default",
        "{controller}/{action}/{id}",
        new { controller = "Home", action = "Index", id = UrlParameter.Optional }
    );
}

void Application_Start(object sender, EventArgs e)
{
    AreaRegistration.RegisterAllAreas();
    RegisterRoutes(RouteTable.Routes);
}
```

**HomeController.cs:**
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Test.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewData["Message"] = "Welcome to ASP.NET MVC!";
            return View();
        }
    }
}
```

## MVC with Webforms
But most of us never start with new projects right? So you have to do a bit more work. Add the following as Reference to your Web Application

![](/content/images/2013/Dec/references.png)

Now Update your <b>web.config </b> to reflect the references


Now Add the Controllers, Views, Folders to the root of application and you are good to go:
View - /Views/Home/Index.aspx


You can even use the same Master Page
![](/content/images/2013/Dec/screen1_300x227.png)

P.S: The VS Project doesn't support integrated way of creating Views and Controllers in this method

