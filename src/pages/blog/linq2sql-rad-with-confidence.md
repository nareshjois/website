---
layout: "../../layouts/BlogPost.astro"
title: "LINQ2SQL RAD with confidence"
description: ""
pubDate: "2009-01-24T12:52:07.000Z"
heroImage: ""
slug: "linq2sql-rad-with-confidence"
tags: [".net"]
---

If you are like me who also does have to done some rapid prototyping and application development, you know how painstaking it is to do setup each wire for even a simple application to work, and you will be working so rapidly that you would have forgotten the column names you have entered in db few minutes ago, that fact aside you would still require a large prieces of code which would actually constitute the middle tier of application, but the problem is in RAD you do need a top notch middle tier which would cover all the aspects required, then what ? and add to that the fact that you are so used to working with objects that you have even forgotten how to retrive data just using code or you find the whole connection - adapter - dataset thing too outdated and too much work just to retrive one row from db.

Now we know what a middle teir is , its nothing but an ORM which maps objects to data along with addtional functions to manipulate that data, for this there exists good amount of code generators which based on your database would generate all code required which would constitute the core of middle tier, but i always found them to be too cumberome ( may be i am too lazy) , now may be some year and a half ago , i was working on a project which extensively used LINQ for queying objects, instead of writing functions for each thing, till then LINQ has become second nature, and i wonder how i used to to do this when LINQ was not around, same time i started looking web for LINQ and i saw something about DLINQ which is now reffered to as LINQ2SQL, LINQ2SQL does what we need to do the hard way, wire up. Just create a new LINQ2SQL class in your project and drag the tables from Server Explorer and voila , you have your midddle tier ready (well not exactly) , it creates classes for each of the table in the db along with associations for relations ,  (eg : If i have a students table in it creates a student class with each column in student as a property, and if you have something like SectionId in Student which links to the section table you can access the linked section by just using Student.Section). Everything becomes so simple from here on, atleast for RAD, It also creates functions for SPs,

The only problem i have with this till date is it works only with SQL Server (I have been able to get it working with SQLCE - If  this only worked with MySQL) and some things like serialization doesn't happen the way i want it to , but anyway this is a tool which you have to use once to get know its usefullness.
