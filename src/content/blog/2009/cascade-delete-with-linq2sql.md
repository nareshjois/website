---
title: "Cascade Delete with Linq2SQL"
description: ""
pubDate: "2009-12-22T23:16:52.000Z"
heroImage: ""
slug: "cascade-delete-with-linq2sql"
tags: [".net"]
---

Consider this: you have Invoice and Invoice details in 2 tables and the details are referenced by InvoiceId. What happens to Invoice Details once you delete the invoice? In SQL at least you can do cascade delete and also set the value to null, but most real life programs would want to delete the details. LINQ2SQL by default tries to set a null value which in most cases fails, and there is no visual way to set this - the only way to do this is to do some manual XML editing.

Right click and open the .dbml file with the XML Editor and then navigate to the table for which you want to do this, then look for the relation which references the parent table:

```xml
<Association Name="..." ... DeleteOnNull="true" />
```

Adding `DeleteOnNull="true"` to this association makes it behave as expected.

