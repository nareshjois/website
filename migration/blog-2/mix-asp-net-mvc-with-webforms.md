---
layout: "../../layouts/BlogPost.astro"
title: "Mix and Mash Asp.net MVC with Webforms"
description: ""
pubDate: "2010-10-29 13:18:26"
heroImage: ""
slug: "mix-asp-net-mvc-with-webforms"
---

A lot of people including me wanted to to get on the bandwagon of ASP.net MVC, but the main problem is we do not always get to start new projects and there is always a timeline hanging. I will not talk about the benefits of MVC Pattern as most of us already aware of it, But for an ASP.net Developer where everything is tied up in Webforms this may seem difficult, but once you start taking advantages of this pattern, the usefulness becomes obvious, me having worked on Rails and PHP frameworks such as CodeIgnitor and CakePHP, It was never a question of If, but when, and the best way to begin would be use your existing skills with webforms and start bringin in MVC Pattern, and before you know it you can be completely taking the benefits out of both worlds.

<h2>Webforms with MVC</h2>
If you are starting with a new project its really simple, start of with a new MVC Project in Visual Studio Add a New Webform run it and thats it no configuration required, the reason is that because MVC Framework is built on top of same ASP.net platform, it runs and the reason why the routing doesn't try and hijack this request is because of the way it works, if the physical file of the request exists the request is always made to the aspx file, for better performance and save disk query on each .aspx request you can also add the following line in your global.asax

<script src="https://gist.github.com/nareshjois/7896708.js"></script>

<h2>MVC with Webforms</h2>
But most of us never start with new projects right ?, so you have to do a bit more work, Add the following as Reference to your Web Application

![](/content/images/2013/Dec/references.png)

Now Update your <b>web.config </b> to reflect the references


Now Add the Controllers, Views, Folders to the root of application and you are good to go:
View - /Views/Home/Index.aspx


You can even use the same Master Page
![](/content/images/2013/Dec/screen1_300x227.png)

P.S: The VS Project doesn't support integrated way of creating Views and Controllers in this method

