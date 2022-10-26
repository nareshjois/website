---
layout: "../../layouts/BlogPost.astro"
title: "Use Linq with SQL CE"
description: ""
pubDate: "2009-02-20T09:51:54.000Z"
heroImage: ""
slug: "use-linq-with-sql-ce"
tags: [".net"]
---

If you have tried this before you might have run into an error which says that the database is unsupported, Baisically LINQ2SQL in just language extension which converts into plain old SQL, so in theory it should work with any database, but SQL CE supports the same SQL as SQL Server This is not because Linq2SQL doesn't support SQL CE  but VS ORM designer doesn't support that, but there is a way in which you can generate the Linq2SQL class ,
This is by using the "SQLMetal.exe", this utility helps you in generating the Linq2SQL classes,
To do this simply create a batch file with the following command in the SQLCE database directory
```bash
"C:Program Files\Microsoft SDKs\Windows\v6.0a\bin\sqlmetal.exe" /pluralize /dbml:DBMLNAME.dbml DATAFILENAME.sdf
```
This will create the DBML which you can then edit and manipulate in the VS ORM designer, and since the datacontext will not have connection string in it, while initializing the data context you can use something like

```csharp
DataContext db = new DataContext (@"Data Source=DataBase.sdf");
```


