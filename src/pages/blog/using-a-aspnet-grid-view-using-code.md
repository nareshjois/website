---
layout: "../../layouts/BlogPost.astro"
title: "Using a ASP.net Grid view using code"
description: ""
pubDate: "2007-11-18 09:58:41"
heroImage: ""
slug: "using-a-aspnet-grid-view-using-code"
---

We have all used grid view along with data sources but some time you need to to that from code, the problem is most of us do not know how to use this from code, but Its not that difficult to that. Here's a simple way to do that.

A Simple grid  First column is a readonly templated field, second one a readonly bound field and third a templated entry field. At the Edit the edit command Field
First Write a Function for loading data which will be reused on every action. I call it BindData()

<script src="https://gist.github.com/nareshjois/7879340.js"></script>

Now since the gridview is binded from code we have to handle all its events. So When the user clicks on edit. Here I have done two things  one is enable editing mode, then I store the data of textbox in a viewstate, so that it can be accessed later when updating, please remember that the regular method of e.OldValues and e.NewValues Will not work because we have to do that manually, (which can be done, but for our purposes we will use viewstate)
Now for the cancel part
Now for the update part. First new value is found out, if it is blank nothing is done, if old value does not Exist INSERT command is used if old value does exist UPDATE command is used. Here I did a Simple SQL execution but I think you will figure out a better way

