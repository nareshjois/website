---
layout: "../../layouts/BlogPost.astro"
title: "Nuget Workflow on Azure DevOps"
description: ""
pubDate: "2020-05-10T12:08:11.000Z"
heroImage: "/content/images/2020/05/iu.png"
slug: "nuget-workflow-on-azure-devops"
tags: ["DevOps"]
---

Our .net project has grown quite a bit in the last few years, and we recently switched over to Azure Devops. This not just gave us access to Pipelines but also access to artifact repository where you can setup private Nuget feeds. Our project itself was strcutred to be modular so it was easy to break out components and make them as seperate packages, there were a few steps needed to completly automate the worflow, 

## Settting up the build test pipeline

The following is the entire pipeline bascially following 
- Install Nuget 
- Nuget Restore 
- Run Test suite 
- Package Nuget 
- Publish to Feed
<br/><br/>
<script src="https://gist.github.com/nareshjois/c2acaf2b5cefebb0751cb354297880f2.js"></script>

while the steps themselves are self explanatory, the only additional thing we have done is make build to follow semantic versioning by using variables.
The nice thing about this is test results are integrated right in the UI
![](/content/images/2020/05/image.png)

(Next would be setup code coverage report)</p>

## Debugging Local 
There are cases in which we wanted to debug the packages as part to the main project. Here's where the nice dotnet tool <a href="https://github.com/RicoSuter/DNT">DNT</a> comes in 
Follwing the instructions <a href="https://github.com/RicoSuter/DNT#switch-to-projects">https://github.com/RicoSuter/DNT#switch-to-projects</a> a simple json file and two batch files later we have a completed local debug workflow.
