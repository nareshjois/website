---
title: "LINQ2SQL RAD with confidence"
description: ""
pubDate: "2009-01-24T12:52:07.000Z"
heroImage: ""
slug: "linq2sql-rad-with-confidence"
tags: [".net"]
---

If you are like me who also has to do some rapid prototyping and application development, you know how painstaking it is to set up each wire for even a simple application to work, and you will be working so rapidly that you would have forgotten the column names you have entered in the DB a few minutes ago. That fact aside, you would still require large pieces of code which would actually constitute the middle tier of the application, but the problem is in RAD you do need a top-notch middle tier which would cover all the aspects required, then what? And add to that the fact that you are so used to working with objects that you have even forgotten how to retrieve data just using code, or you find the whole connection-adapter-dataset thing too outdated and too much work just to retrieve one row from the DB.

Now we know what a middle tier is; it's nothing but an ORM which maps objects to data along with additional functions to manipulate that data. For this there exists a good amount of code generators which, based on your database, would generate all code required which would constitute the core of the middle tier, but I always found them to be too cumbersome (maybe I am too lazy). Now, maybe some year and a half ago, I was working on a project which extensively used LINQ for querying objects instead of writing functions for each thing. By then LINQ had become second nature, and I wonder how I used to do this when LINQ was not around. Around the same time I started looking on the web for LINQ and I saw something about DLINQ which is now referred to as LINQ2SQL. LINQ2SQL does what we need to do the hard way: wire up. Just create a new LINQ2SQL class in your project and drag the tables from Server Explorer and voila, you have your middle tier ready (well not exactly). It creates classes for each of the tables in the DB along with associations for relations (e.g., if I have a students table, it creates a Student class with each column in Student as a property, and if you have something like SectionId in Student which links to the Section table, you can access the linked section by just using Student.Section). Everything becomes so simple from here on, at least for RAD. It also creates functions for SPs.

The only problem I have with this till date is it works only with SQL Server (I have been able to get it working with SQLCE - if only this worked with MySQL) and some things like serialization don't happen the way I want them to, but anyway this is a tool which you have to use once to get to know its usefulness.
