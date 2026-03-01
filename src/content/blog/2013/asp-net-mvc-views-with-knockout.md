---
title: "Moving View from ASP.net MVC to Standard HTML views with Knockout Goodness"
description: ""
pubDate: "2013-07-04T12:14:46.000Z"
heroImage: ""
slug: "asp-net-mvc-views-with-knockout"
tags: [".net"]
---

We started moving sections of one of the apps that we are building to a SPA. While that is all and good, we could not migrate everything to JS+HTML all at once. So the idea was to do it in increments. Step 1 would be to move the list screens and bring in the collection.

```csharp
@model IEnumerable<playground .Controllers.SampleModel>
@{
    Layout = null;
}
< !DOCTYPE html>
 
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Index</title>
</head>
<body>
    <div>
        <table>
            <tr>
                <th>
                    First Name
                </th>
                <th>
                    Last Name
                </th>
            </tr>
            @foreach (var m in @Model)
            {
                <tr>
                    <td>
                        @m.FirstName
                    </td>
                    <td>
                        @m.LastName
                    </td>
                </tr>
            }
        </table>
    </div>
</body>
</html>
```

```csharp
@{
    Layout = null;
}
< !DOCTYPE html>
 
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Index</title>
</head>
<body>
    <div>
        <table>
            <tr>
                <th>
                    First Name
                </th>
                <th>
                    Last Name
                </th>
            </tr>
            <tbody data-bind="foreach: viewItems">
                <tr>
                    <td data-bind="html:FirstName">
 
                    </td>
                    <td data-bind="html:LastName">
 
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <script src="~/Scripts/jquery-1.9.1.js"></script>
    <script src="~/Scripts/knockout-2.2.1.js"></script>
    <script src="~/Scripts/knockout.mapping-latest.js"></script>
    <script type="text/javascript">
        (function ($, ko, window, document, undefined) {
 
            var mapping = {
                'viewItems': {
                  create:function(options) {
                      return new viewItem(options.data);
                  }
              }  
            };
            var viewItem = function(data) {
                var self = this;
                self.FirstName = ko.observable();
                self.LastName = ko.observable();
                ko.mapping.fromJS(data, mapping, self);
            };
 
 
            window.viewModel =
            {
                viewItems : ko.observableArray([])
            };
            $(document).ready(function () {
                $.get('/Sample/GetData', function(data) {
                    ko.mapping.fromJS({ viewItems: data }, mapping, viewModel);
                });
                ko.applyBindings(viewModel);
            });
        })(jQuery,ko,window,document)
    </script>
</body>
</html>
```

```csharp
using System.Collections.Generic;
using System.Web.Mvc;
 
namespace Playground.Controllers
{
    public class SampleModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
 
    public class SampleController : Controller
    {
 
        public ActionResult Index()
        {
            var list = new List<samplemodel>
                           {
                               new SampleModel {FirstName = "John", LastName = "Doe"},
                               new SampleModel {FirstName = "Jane", LastName = "Doe"}
                           };
            return View(list);
        }
    }
}
```

```csharp
public JsonResult GetData()
{
    var list = new List<samplemodel>
                   {
                       new SampleModel {FirstName = "John", LastName = "Doe"},
                       new SampleModel {FirstName = "Jane", LastName = "Doe"}
                   };
    return Json(list, JsonRequestBehavior.AllowGet);
}
```
