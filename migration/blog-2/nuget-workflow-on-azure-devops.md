---
layout: "../../layouts/BlogPost.astro"
title: "Nuget Workflow on Azure DevOps"
description: ""
pubDate: "2020-05-10 12:08:11"
heroImage: "__GHOST_URL__/content/images/2020/05/iu.png"
slug: "nuget-workflow-on-azure-devops"
---

<p>Our .net project has grown quite a bit in the last few years, and we recently switched over to Azure Devops. This not just gave us access to Pipelines but also access to artifact repository where you can setup private Nuget feeds. Our project itself was strcutred to be modular so it was easy to break out components and make them as seperate packages, there were a few steps needed to completly automate the worflow, </p><h2 id="settting-up-the-build-test-pipeline">Settting up the build test pipeline</h2><p>The following is the entire pipeline bascially following </p><p>Install Nuget &gt; Nuget Restore &gt; Run Test suite &gt; Package Nuget &gt; Publish to Feed</p><!--kg-card-begin: html--><script src="https://gist.github.com/nareshjois/c2acaf2b5cefebb0751cb354297880f2.js"></script><!--kg-card-end: html--><p>while the steps themselves are self explanatory, the only additional thing we have done is make build to follow semantic versioning by using variables.</p><p>The nice thing about this is test results are integrated right in the UI</p><figure class="kg-card kg-image-card"><img src="/content/images/2020/05/image.png" class="kg-image" alt loading="lazy"></figure><p>(Next would be setup code coverage report)</p><h2 id="debugging-local">Debugging Local</h2><p>There are cases in which we wanted to debug the packages as part to the main project. Here's where the nice dotnet tool <a href="https://github.com/RicoSuter/DNT">DNT</a> comes in </p><p>Follwing the instructions <a href="https://github.com/RicoSuter/DNT#switch-to-projects">https://github.com/RicoSuter/DNT#switch-to-projects</a> a simple json file and two batch files later we have a completed local debug workflow. </p>
