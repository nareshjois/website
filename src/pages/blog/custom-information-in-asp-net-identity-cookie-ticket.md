---
layout: "../../layouts/BlogPost.astro"
title: "Custom Information in Asp.net Identity Cookie/ Ticket"
description: ""
pubDate: "2014-01-10 10:12:25"
heroImage: ""
slug: "custom-information-in-asp-net-identity-cookie-ticket"
---

With MVC 5 Asp.net has done away with the Forms based authentication (for good) and has replaced that with the OWIN Security Middleware,

Brock Allen has writter an nice post summarizing the basics 
> [A primer on OWIN cookie authentication middleware](http://brockallen.com/2013/10/24/a-primer-on-owin-cookie-authentication-middleware-for-the-asp-net-developer/)

Because the identity is claim based you can add additional claim to the user for later use.

If you are just looking to add information using the existing ApplicationOAuthProvider Update the code to read.

<script src="https://gist.github.com/anonymous/8349468.js"></script>

Note that I am adding a singe claim called E-mail, and i am also using both cookie and ticket.

To Access the Claims you can
`var context = (OwinContext)HttpContext.Current.GetOwinContext();
var owinUser = context.Authentication.User; var claims = owinUser.Claims;`
