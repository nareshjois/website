---
layout: "../../layouts/BlogPost.astro"
title: "Nifty Little script to check identity columns"
description: ""
pubDate: "2011-10-10T15:58:00.000Z"
heroImage: ""
slug: "nifty-little-script-to-check-identity-columns"
tags: ["SQL"]
---

I had to recently check for identity specification on all the tables in a database and this nifty little script helped me in doing this.<div>Thanks Akshay for writing this for me.</div><div><br />
```sql
CREATE PROC dbo.CheckIdentities  
AS  
BEGIN  
 SET NOCOUNT ON  
  
 SELECT QUOTENAME(SCHEMA_NAME(t.schema_id)) + '.' +  QUOTENAME(t.name) AS TableName,   
  c.name AS ColumnName,  
  CASE c.system_type_id  
   WHEN 127 THEN 'bigint'  
   WHEN 56 THEN 'int'  
   WHEN 52 THEN 'smallint'  
   WHEN 48 THEN 'tinyint'  
  END AS 'DataType',  
  IDENT_CURRENT(SCHEMA_NAME(t.schema_id)  + '.' + t.name) AS CurrentIdentityValue,  
  CASE c.system_type_id  
   WHEN 127 THEN (IDENT_CURRENT(SCHEMA_NAME(t.schema_id)  + '.' + t.name) * 100.) / 9223372036854775807  
   WHEN 56 THEN (IDENT_CURRENT(SCHEMA_NAME(t.schema_id)  + '.' + t.name) * 100.) / 2147483647  
   WHEN 52 THEN (IDENT_CURRENT(SCHEMA_NAME(t.schema_id)  + '.' + t.name) * 100.) / 32767  
   WHEN 48 THEN (IDENT_CURRENT(SCHEMA_NAME(t.schema_id)  + '.' + t.name) * 100.) / 255  
  END AS 'PercentageUsed'   
 FROM sys.columns AS c   
  INNER JOIN  
  sys.tables AS t   
  ON t.[object_id] = c.[object_id]  
 WHERE c.is_identity = 1  
 ORDER BY PercentageUsed DESC  
END
```
