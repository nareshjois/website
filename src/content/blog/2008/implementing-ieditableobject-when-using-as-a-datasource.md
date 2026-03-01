---
title: "Implementing IEditableObject when using as a datasource"
description: ""
pubDate: "2008-12-16T18:00:05.000Z"
heroImage: ""
slug: "implementing-ieditableobject-when-using-as-a-datasource"
tags: [".net"]
---

If you have used a class as a datasource, you would know that to provide proper validation you would need to implement IEditableObject. But if you don't, it's really simple - all you have to do is provide 3 functions. The code mentioned below is a simple example and I think you can take it from there:

```csharp
public class ReceiptPay : IEditableObject
{
    public int FeeComponentId { get; set; }
    public string FeeComponent { get; set; }
    public decimal Amount { get; set; }

    private decimal amtbkp;
    private bool inTXN = false;

    public ReceiptPay(int FCId, string FC)
    {
        FeeComponentId = FCId;
        FeeComponent = FC;
    }

    #region IEditableObject Members

    public void BeginEdit()
    {
        if (!inTXN)
        {
            amtbkp = Amount;
            inTXN = true;
        }
    }

    public void CancelEdit()
    {
        if (inTXN)
        {
            Amount = amtbkp;
            inTXN = false;
        }
    }

    public void EndEdit()
    {
        inTXN = false;
    }

    #endregion
}
```
