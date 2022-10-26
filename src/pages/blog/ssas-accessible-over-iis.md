---
layout: "../../layouts/BlogPost.astro"
title: "Make SSAS Accessible over IIS"
description: ""
pubDate: "2012-11-06T16:12:18.000Z"
heroImage: ""
slug: "ssas-accessible-over-iis"
tags: ["SQL"]
---

We are currently working on SSAS and building an analytics dashboard with custom charting and we are using Asp.net MVC for the web application part, ours being a small team, we have not setup Active Directory nor have we setup centralized Windows Authentication.
Here starts the problem SSAS can only accessed by an authenticated user on the Server and having Permission.
So as a solution we access SSAH over HTTP and the setup is very straight forward.
1. Create a New Application Pool in IIS and can have .net Framework 2.0 in Classic Mode
2. Change the Application Pool User from "ApplicationPoolIdentity" to a specific  
3. Create a New Application in IIS and point it to an empty directory.User who has access SSAS
4. Put the newly Created Application in the Application Pool.
5. Copy Files from C:\Program Files\Microsoft SQL Server\MSASXX.MSSQLServer\OLAP\bin\ISAPI to the folder you created.
6. In the Handler Mappings of the Application in IIS, Create a new Script Map with the following Parameters
   a. Request Path : *.dll
   b. Executable : &lt;directory&gt;\msmdpump.dll
7. Click 'Yes' in the Edit Script Map Dialog.

That's It from now Instead of Just giving the server Name in DataSource=Server of your connection string, you can use DataSource=http://&lt;WebApplicationAddress&gt;/msmdpump.dll
