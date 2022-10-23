---
layout: "../../layouts/BlogPost.astro"
title: "Play with Clay"
description: ""
pubDate: "2011-06-03 13:43:10"
heroImage: ""
slug: "play-with-clay"
---

I have been a big fan of ExpandoObject ever since it was introduced with .net 4.0, and I have been using the Expando Object object ever since, but I always felt that it was not enough, ExpandoObject was fun and all but it was just not enough, and me being really lazy remember coying and pasting code just to loop through properties of a class using reflection and all that headache.

Enter Clay : The moment I have laid my eyes on this beautiful piece of code, I have become a huge fan, and it has all the things the expando should have been.

So How do you begin , Its really simple and also follows unique naming convention you begin with a clay object with New (emphasis on uppercase 'N')
`dynamic New = new ClayFactory();
var cUser = New.User();`

and thats it,
In Clay Indexer Syntax and Property Accessors are the same so

`cUser.Name = cUser["Name"];`

you can pass anonymous objects and also accepts named arguments, you can also use jQuery style chain able setters or put use them as an array


`var cUser = New.User(new { Name = "Naresh", Mail = "something@mail.com" });
var cUser = New.User( Name : "Naresh", Mail : "something@mail.com");
var cUser = New.User().Name("Naresh").Mail("something@mail.com"); var Users = New.Array(New.User().Name("Naresh").Mail("something@mail.com"),New.User().Name("Rakesh").Mail("something@mail.com"));`


So What are you waiting for get started at 
<a href="http://clay.codeplex.com/">clay.codeplex.com</a>
