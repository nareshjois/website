---
layout: "../../layouts/BlogPost.astro"
title: "Reading Metadata of the Buddy Class"
description: ""
pubDate: "2011-07-04T12:26:31.000Z"
heroImage: ""
slug: "reading-metadata-of-the-buddy-class"
tags: [".net"]
---

Most of the time we would be using buddy classes for putting metadata for auto generated classes, for example:
Say if this is the autogenerated class
```csharp
 public partial class Person
    {
        public string FirstName { ..... }
        public string LastName {..... }
        public int Age { .....  }
    }
```
Our buddy class would be
```csharp
    public class PersonMetaData
    {
        [Display(Name="First Name")]
        public string FirstName { get; set; }
        [Display(Name="Last Name")]
        public string LastName { get; set; }
        [Display(Name="Age")]
        public int Age { get; set; }
    }
```

This is fine but what if we want to read this data back, if we use the Class.GetProperties() we do not get this data back so basically we would have to go through a hoop, but its fairly simple
```csharp
PropertyInfo[] headerInfo = typeof(Person).GetProperties();
            var attributesofclass = typeof(Person).GetCustomAttributes(true);
            for (int n = 0; n < headerInfo.Length; n++)
            {   
                var attributesofbase = (System.ComponentModel.DataAnnotations.DisplayAttribute[])headerInfo[n].GetCustomAttributes(typeof(System.ComponentModel.DataAnnotations.DisplayAttribute),true);
                if (attributesofbase.Count()== 0){
                    var medatadataofclass = (System.ComponentModel.DataAnnotations.MetadataTypeAttribute[])typeof(T).GetCustomAttributes(typeof(System.ComponentModel.DataAnnotations.MetadataTypeAttribute), true);
                    if (medatadataofclass.Count() > 0)
                    {
                        var metadatatypeofclass = medatadataofclass.First().MetadataClassType.GetProperty(headerInfo[n].Name);
                        if (metadatatypeofclass != null){
                            var metadataofproperty = (System.ComponentModel.DataAnnotations.DisplayAttribute[])metadatatypeofclass.GetCustomAttributes(typeof(System.ComponentModel.DataAnnotations.DisplayAttribute), true);
                        }
                    }
                }
            }
```
