---
layout: "../../layouts/BlogPost.astro"
title: "Recover Jobs from a crashed SQL Server"
description: ""
pubDate: "2011-10-11T15:58:00.000Z"
heroImage: ""
slug: "recover-jobs-from-a-crashed-sql-server"
tags: ["SQL"]
---

I recently came across the scenario where a SQL server had crashed (with Windows) but the file system was intact, so we started restore of databases which was straight forward as easy as attaching to the new instance on different server. But we also had lot of jobs scheduled on the old server, and wanted to recover them as well, so after a doing a bit of search figured out that the jobs are saved in "msdb" system database.
So to restore

 1. Create a dummy instance of SQL Server.
 2. Stop the instance.
 3. Replace the .mdf & .ldf files from the crashed server of the msdb
    database.
 4. Start the Server Instance as well as agent.
 5. voila, you have your jobs, now script those jobs and execute on new
    server

and you are good to go..
