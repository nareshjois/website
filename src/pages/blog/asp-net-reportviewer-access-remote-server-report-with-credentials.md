---
layout: "../../layouts/BlogPost.astro"
title: "Asp.net ReportViewer : Access Remote Server Report with Credentials"
description: ""
pubDate: "2011-09-09T13:08:30.000Z"
heroImage: ""
slug: "asp-net-reportviewer-access-remote-server-report-with-credentials"
tags: [".net"]
---

If you want to work with remote SSRS report while debugging your asp.net application you would want to authenticate with the remote server, you cannot use asp.net impersonation as this would actually make the entire application run under impersonation so to solve this we can use impersonation for the report viewer only to do this :

```csharp
#if (DEBUG)
this.ReportViewer1.ServerReport.ReportServerCredentials = new ReportServerCredentials("username", "password","domain");
#endif
```

and a <b>ReportServerCredentials</b> class
```csharp
public class ReportServerCredentials : IReportServerCredentials
    {
        private string _userName;
        private string _password;
        private string _domain;

        public ReportServerCredentials(string userName, string password, string domain)
        {
            _userName = userName;
            _password = password;
            _domain = domain;
        }

        public System.Security.Principal.WindowsIdentity ImpersonationUser
        {
            get { return null; }
        }


        public System.Net.ICredentials NetworkCredentials
        {
            get { return new System.Net.NetworkCredential(_userName, _password, _domain); }
        }


        bool IReportServerCredentials.GetFormsCredentials(out Cookie authCookie, out string userName, out string password, out string authority)
        {
            authCookie = null;
            userName = _userName;
            password = _password
            authority = _domain;
            return false;
        }
    }
```
