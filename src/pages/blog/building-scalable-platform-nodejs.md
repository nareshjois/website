---
layout: "../../layouts/BlogPost.astro"
title: "Building Scalable E-Commerce Platform in NodeJS"
description: ""
pubDate: "2015-11-25T20:09:29.000Z"
heroImage: "/content/images/2015/11/IMG_0639-1.png"
slug: "building-scalable-platform-nodejs"
tags: ["JS"]
---

Things have been fairly quiet on my blog for the past year, But things have been a lot hectic all year long. I have had a chance to work on some wonderful consumer facing E-commerce applications and a product which I will detail in another post. There was a lot of learning and lot of sleepless nights during this.
In this post, I would like to share what we chose to  build the E-commerce Platform.

## Brief

The brief was to build a rewards platform which allows you to redeem your earned points for products, flights, hotels, movies etc.
The platform would act as an aggregator and should be extensible to be configured for different banks or loyalty platforms and skinned accordingly. The platform should also be able to switch providers on the fly.
Infrastructure wise the platform should run on CentOS on AWS.

## Technology Choices

With the Brief also came the question on technology stack. While we as a company had dabbled on many stacks, we wanted a definite ability to meet timelines and comfort of developers and tools. Add to it the fact that it needed to run on *nix, It came down to Nodejs and PHP. From that point onwards it was a no-brainer, and as the title already spoiled it NodeJS would be used.

## Tooling

Well, we all know how stupid javascript can be or more importantly how stupid developers can be when using javascript. We wanted to use something which we can then compile down to javascript so that we can have some sanity and some development time checks.
CoffeeScript and Typescript were the choices and the latter was the clear winner, Its straightforward for Javascript developers and has enough goodies for doing compile-time checks to make sure were not being utterly stupid. 
Then came the code editor/ debugger. While we were using Visual Studio for our earlier projects. We recently moved to Ubuntu on a number of developers PCs and wanted something which can run on Linux. Sublime Editor + Node-Debug was the preferred choice, but something new came along, Visual Studio Code from Microsoft, if you haven't been living in a cave you might have already come across this and what started out with one developer quickly spread through the team. We jumped in when VSCode was at 0.3 and we  have really liked the direction the editor has taken.
 And a small shout out to Paw on Mac which has been my lifesaver so many numbers of times.

## Databases
From the outset, we knew that going to a single database approach would not be a great solution. So we took the hybrid Approach

## MongoDB
This fit it perfectly for slow changing data like Product Data or Hotel Inventory Information. Each entity was independent and had very little joins with others. Full-Text Search + GeoLocation Search were added advantages

## MySQL
For the transactional data, we felt that a good relational database made more sense while what ended up with is not that relational. Very few Searches are performed on this database and more importantly it has 1-to-1 read-only replica which are used for querying and reporting purposes.

## Caching:Redis
The Central API talks to several API Providers and we also wanted to implement the cache for API responses so as to cheat on the performance a bit. Redis was a perfect fit. It is also used for noncritical caches and is configured to be No Disk Write mode.


## Frameworks
The question was whether we handcraft a framework or start with an existing one for the API gateway. I dabbled in a few but at the end Loopback came out ahead because of its sheer simplicity when it came to creating REST-APIs, As mentioned earlier one of the briefs was to keep Vendors switchable so we wanted to build a common API definition which the client applications could use without worrying about the vendor and the implementation mechanisms. Loopback actually had tons of additional features like a soap adapter (which was not used).

## Web Application

## Server: ExpressJS + nginx

While NodeJS is still considered new in enterprises. It has already proved itself in terms of performance and being lightweight. We chose ExpressJS with Handlebars templating as that was probably the easiest in terms of frameworks.

## Client: KnockoutJS

For the browser where we wanted dynamic experiences for the user, we build mini-apps usings KnockoutJS and Jquery. ReactJS is slowly being introduced.

## Audit + Reporing

## ELK Stack
As the applications built would be for banks and loyalty programs Audit Trail and Logging were of extreme importance and ELK Stack (ElasticSearch+LogStash+Kibana for the uninitiated) fit right in. Using Kibana we were also able to create basic dashboards of metrics which was not just for operational monitoring but also business use case.

## Mobile Apps 
While we are not building mobile apps ourselves, Most apps are built as native but there is one client application which is just a web view wrapper around the responsive website.

## Final Stack

![Stack Overview](/content/images/2015/11/Stack.png)

## Asides

While the following are not high-level frameworks or components, I could not complete this post without mentioning them

## async.js : Way out of Callback Hell
If you have used or understood how NodeJS functions you know what a callback hell is (it is just a search away). But async was a life saver, If there is one library which was most used in the entire development it is async with its [waterfall],[map],[parallel] methods we have been able to write code which actually is understandable.

## NewRelic : DevOps Monitoring made simple
NewRelic is one of those things that you must have in your application. Monitoring Production apps are always difficult and NewRelic was the answer to finding the pain points in performance in production.

## Gulp: Not used for what you think
Gulp is an excellent task runner and we have used it not just for the web-application but have also made it an integral part of the tool-chain in build and release management.


## Performance
While all of the above is talk what matters at the end (other than Sales) is Performance 
So using a Medium Instance for the API Server and two Load balanced Micro Instances for web application server The following is average response times and percentages for the last 2 months 

- API Server: 246ms.
- Web Server: 143ms.
- Overall Error % : 4 %
- Application Error % : 0.5% (Excluding 3rd Party API Errors)

![User Visit Spread](/content/images/2015/11/IMG_0639-1.png)


## What is Missing
While we are still building more applications, we are also missing some integral pieces to make the solution complete.

- Automated Deployment from GIT.
- Automated Environment Management 
- Dashboarding and Reporting for Business Users. (Our product should fit right in)


The Platform is making progress with multiple web applications being added and I will try and write a follow-up on this soon which has information on scalability.
