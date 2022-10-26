---
layout: "../../layouts/BlogPost.astro"
title: "Software Design Patters : Principle : Open Close Principle"
description: ""
pubDate: "2012-01-31T18:34:37.000Z"
heroImage: ""
slug: "software-design-patters-open-close-principle"
tags: [".net"]
---

I was about to write on the Factory Pattern and the while preparing the post thinking I kept referring to the Open Closed Principle and thought let me talk about this first, so along with Patterns I will keep adding a few principles along the way.
<blockquote>Open Closed Principle basically states that your code should be Open for Extension but Closed for Modification </blockquote>
So what does this mean ? Basically this means that the software entities should be written in such a way that the extending it should be fairly easy and you should not be actually hacking into the original code to introduce a new way.
Let me take a simple example, say you are building a shopping cart, and you have to accept the payment from the user. If the principle is not applied the code would be written something like (this is simplifying a lot but you should get the idea.

```csharp
       public bool ProcessCart(Cart cart, string PaymentMethod)
        {
            switch (PaymentMethod)
            {
                case "Cash On Delivery":
                    return PayUsingCash(cart);
                case "Credit Card":
                    return PayUsingCreditCard(cart);
            }
        }
```

This code should function fine but the problem is this method is closed for extension and to introduce a new payment method we have to modify the code and introduce a new case and then implement it, every time we need to implement a new payment method we have to go in and modify the original code, which means retest the whole thing, 
What Open Closed principle suggests is that the this code should be open for extension and should not be modified. Thus if we were to re factor this into OCP  our code would look something like

```csharp
       interface IPaymentProcessor
       {
           bool Process(Cart cart);
       }

       public bool ProcessCart(Cart cart, String PaymentMethod)
       {
           IPaymentProcessor payproc = PaymentFactory.CreateProcessor(PaymentMethod);
           payproc.Process(cart);
       }
```

We basically start Of with an interface which implements a method called Process, and our ProcessCart Method does not have to worry about the options available, the PaymentFactory is responsible for the getting the payment processor based on parameter, and this factory can be designed to read the available options say using configuration thus eliminating the need to recompile code everytime a new payment processor is added. 
I will dwell into the details of the FactoryPattern in my next post on how exactly we can do this.
In the meanwhile please feel free to comment on the posts. 

