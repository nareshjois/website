---
layout: "../../layouts/BlogPost.astro"
title: "Reset your SQL Server login"
description: ""
pubDate: "2011-08-16 22:16:50"
heroImage: ""
slug: "reset-your-sql-server-login"
---

Recently I faced a situation where the SQL Server was setup but no one knew the login, and the SQL server was not configured in Mixed Mode Authentication, so how do you recover from this situation other than re installing the instance,
Stop the running instance and then open up command prompt in Binn directory on the instance which would be something like
<pre lang="bash">
c:\Program Files\Microsoft SQL Server\MSSQL...\Binn 
</pre>
Run the following command
<pre lang="bash">
sqlservr.exe -m"SQLCMD"
</pre>
This would start the instance in single user mode, now open up another command prompt in the same directory
and then run "SQLCMD"
and execute the following statements based on requirement

If you want to add a windows user use
<pre lang="sql">
create login [DOMAIN\USERNAME] from windows;
EXEC sys.sp_addsrvrolemember @loginame = N'DOMAIN\USERNAME', @rolename = N'sysadmin';
GO;
</pre>

To add a SQL Server Login use (remember this works only if mixed mode authentication is enabled)
<pre lang="sql">
CREATE LOGIN [testAdmin] WITH PASSWORD=N'test@1234', DEFAULT_DATABASE=[master];
EXEC sys.sp_addsrvrolemember @loginame = N'testAdmin', @rolename = N'sysadmin';
GO;
</pre>

now exit SQLCMD and also do CTRL+C on first window to stop instance and restart the instance in regular mode.
