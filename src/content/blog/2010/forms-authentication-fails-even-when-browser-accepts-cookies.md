---
title: "Forms Authentication fails even when browser accepts cookies"
description: ""
pubDate: "2010-06-15T12:13:11.000Z"
heroImage: ""
slug: "forms-authentication-fails-even-when-browser-accepts-cookies"
tags: [".net"]
---

While using Forms authentication in ASP.NET:

```xml
<authentication mode="Forms">
    <forms loginUrl="~/Account/Login" timeout="2880" path="/" />
</authentication>
```

Please remember to set `path="/"` or else the cookie-based authentication fails. I am yet to figure out why this is happening but at least this solves the problem.
