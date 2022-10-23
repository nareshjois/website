---
layout: "../../layouts/BlogPost.astro"
title: "Asp.net Dyanamic Data : A leap for RAD"
description: ""
pubDate: "2011-06-23 11:59:41"
heroImage: ""
slug: "asp-net-dyanamic-data-a-leap-for-rad"
---

I have always basically forms over data for the longest period of time (LOB Apps) and most of the time its the same thing over and over again, Setup Database, create scaffolding forms for all the master tables and then move to the next steps, but wait there should be an easy way to this, In the MVC framework you can generate pages based on the model, but there are still a few things that you should wire up manually, enter dynamic data template and this feels like a magical unicorn at the beginning and once you dig deep into into it, its just beautiful, and will save a lot of steps for you.
So lets begin

![](/content/images/2013/Dec/newddproject_300x182.png)

You have 2 options a Linq2SQL based Application or Entity Framework based application and its just a matter of your preference, Then just create a data Context, This is what i did just to go through and this is not a perfect data model but you can get the point, just create your data context you are almost good to go

![](/content/images/2013/Dec/ddmodel.png)

then you ll have to uncomment a single line in global.asax.cs

`DefaultModel.RegisterContext(typeof(DataModel), new ContextConfiguration() { ScaffoldAllTables = true });`

Here the default property for ScaffoldAllTables is false, change it to true if you want scaffolding on all tables, (for now)
and you are done
And this is what you get , Projects and Tasks along with filter and foreign key correctly linked

![](/content/images/2013/Dec/ddstep1.png)

![](/content/images/2013/Dec/ddstep3.png)

![](/content/images/2013/Dec/ddstep4.png)

Now lets customize this a little bit, we would never want all the scaffold all tables and also we would need some validation and hearer names to be changed a bit.
To Scaffold specific tables we will have to mark the tables with [ScaffoldTable(true)] property, and as the Datacontext generated classes are partials we can extend the classes in a seperate file also to provide metadata we will use data annotations and mark all the necessary fields with the required information

https://gist.github.com/nareshjois/7896928

The modified task screen would look like

![](/content/images/2013/Dec/ddstep5.png)

And this is just the beginning we can do a lot more stuff as all the controls can be customized,  I will post about grouping and also customizing display and edit controls in a subsequent blog.
