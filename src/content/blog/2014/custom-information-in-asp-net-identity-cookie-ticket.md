---
title: "Custom Information in Asp.net Identity Cookie/ Ticket"
description: ""
pubDate: "2014-01-10T10:12:25.000Z"
heroImage: ""
slug: "custom-information-in-asp-net-identity-cookie-ticket"
tags: [".net"]
---

With MVC 5, ASP.NET has done away with the Forms-based authentication (for good) and has replaced that with the OWIN Security Middleware.

Brock Allen has written a nice post summarizing the basics:

> [A primer on OWIN cookie authentication middleware](http://brockallen.com/2013/10/24/a-primer-on-owin-cookie-authentication-middleware-for-the-asp-net-developer/)

Because the identity is claim-based, you can add additional claims to the user for later use.

If you are just looking to add information using the existing ApplicationOAuthProvider, update the code to read:

```csharp
public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
{
    using (UserManager<IdentityUser> userManager = _userManagerFactory())
    {
        var user = await userManager.FindAsync(context.UserName, context.Password);
        if (user == null)
        {
            context.SetError("invalid_grant", "invalidcredentials");
            return;
        }
        var claims = new List<Claim>
        {
            new Claim("Email", user.Email),
        };
        var oAuthIdentity = await userManager.CreateIdentityAsync(user, context.Options.AuthenticationType);
        oAuthIdentity.AddClaims(claims);
        var cookiesIdentity = await userManager.CreateIdentityAsync(user, CookieAuthenticationDefaults.AuthenticationType);
        cookiesIdentity.AddClaims(claims);
        var properties = CreateProperties(user.UserName);
        var ticket = new AuthenticationTicket(oAuthIdentity, properties);
        context.Validated(ticket);
        context.Request.Context.Authentication.SignIn(cookiesIdentity);
    }
}
```

Note that I am adding a single claim called Email, and I am also using both cookie and ticket.

To Access the Claims you can
```csharp
var context = (OwinContext)HttpContext.Current.GetOwinContext();
var owinUser = context.Authentication.User; var claims = owinUser.Claims;
```
