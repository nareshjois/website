---
title: "Silverlight RIA: Validate Entity Server Side"
description: ""
pubDate: "2010-11-25T17:30:36.000Z"
heroImage: ""
slug: "validate-entity-server-side"
tags: [".net"]
---

If you are working with validating an entity, simple metadata validation is not always enough - you might have to do a server side validation, and it is really simple. Along with regular metadata, add a CustomValidation attribute which has the type of class where your validation logic resides and the string name of the validation function:

```csharp
[Required(ErrorMessage="Client Name is Required")]
[StringLength(256)]
[DisplayName("Client Name")]
[CustomValidation(typeof(ClientValidations), "ValidateClientName")]
public string ClientName { get; set; }


public static ValidationResult ValidateClientName(string ClientName, ValidationContext context)
{
    Models.DB.Client client = (Models.DB.Client)context.ObjectInstance;
    Web.Models.DB.PortalDataContext pc = new Models.DB.PortalDataContext();
    var existing = pc.Clients.Where(c => c.ClientName == ClientName && c.Id != client.Id && c.Status == true);
    if (existing.Count() > 0)
    {
        return new ValidationResult("Invalid Client Name as the Client Name already Exists", new string[] { "ClientName" });
    }
    return ValidationResult.Success;
}
```
