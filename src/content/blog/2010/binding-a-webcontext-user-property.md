---
title: "Silverlight : Binding a WebContext User Property to a DomainQueryParameter"
description: ""
pubDate: "2010-11-25T17:21:32.000Z"
heroImage: ""
slug: "binding-a-webcontext-user-property"
tags: [".net"]
---

In DomainDataSource, if you want to send a parameter to the query, the simplest way to do this would be:

`{Binding Path=User.Property, Source={StaticResource WebContext}}`

Example:

```xml
<riaControls:DomainDataSource Name="clientsDomainDataSource" QueryName="GetClientsQuery">
    <riaControls:DomainDataSource.DomainContext>
        <web:ClientDomainContext />
    </riaControls:DomainDataSource.DomainContext>
    <riaControls:DomainDataSource.QueryParameters>
        <riaControls:Parameter ParameterName="clientId" 
            Value="{Binding Path=User.ClientId, Source={StaticResource WebContext}}" />
    </riaControls:DomainDataSource.QueryParameters>
</riaControls:DomainDataSource>
```
