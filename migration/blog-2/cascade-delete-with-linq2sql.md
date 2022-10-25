---
layout: "../../layouts/BlogPost.astro"
title: "Cascade Delete with Linq2SQL"
description: ""
pubDate: "2009-12-22 23:16:52"
heroImage: ""
slug: "cascade-delete-with-linq2sql"
---

Consider this, you have Invoice and Invioce details in 2 tables and the details are referenced by InvoiceId, What happens to Invoice Details once you delete the invoice ?, In SQL atleast you can do cascade delete and also set the value to null, but most real life programs would want to delete the details, Linq2SQL by default tries to set a null value which in most cases fails, and there is no visual way to set this the only way to do this is to do some manual xml editing.
Right click and open the .dbml file with the XML Editor and then navigate to the table for which you want to do this, then look for the relation which references the parent table

<script src="https://gist.github.com/nareshjois/7896465.js"></script>

Adding DeleteOnNull="true" to this association makes it behave as expected

