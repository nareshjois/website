---
title: "Nuget Workflow on Azure DevOps"
description: ""
pubDate: "2020-05-10T12:08:11.000Z"
heroImage: "/content/images/2020/05/iu.png"
slug: "nuget-workflow-on-azure-devops"
tags: ["DevOps"]
---

Our .NET project has grown quite a bit in the last few years, and we recently switched over to Azure DevOps. This not just gave us access to Pipelines but also access to an artifact repository where you can setup private NuGet feeds. Our project itself was structured to be modular, so it was easy to break out components and make them as separate packages. There were a few steps needed to completely automate the workflow.

## Setting up the build test pipeline

The following is the entire pipeline basically following:
- Install NuGet 
- NuGet Restore 
- Run Test suite 
- Package NuGet 
- Publish to Feed

```yaml
# ASP.NET Core (.NET Framework)
# Build and test ASP.NET Core projects targeting the full .NET Framework.

trigger:
- master

pool:
  vmImage: 'windows-latest'

variables:
  solution: '**/*.sln'
  buildPlatform: 'Any CPU'
  buildConfiguration: 'Release'
  major: 1
  minor: 0
  patch: $[counter(variables['minor'], 0)]
  NugetVersion: $(major).$(minor).$(patch)

steps:
- task: NuGetToolInstaller@1

- task: NuGetCommand@2
  inputs:
    restoreSolution: '$(solution)'

- task: DotNetCoreCLI@2
  inputs:
    command: 'test'
    projects: '**/*.Tests.csproj'
    testRunTitle: 'Tests'
 
- task: DotNetCoreCLI@2
  displayName: "Pack"
  inputs:
    command: 'pack'
    packagesToPack: '**/*.csproj'
    versioningScheme: 'byEnvVar'
    versionEnvVar: 'NugetVersion'

- task: NuGetAuthenticate@0
  displayName: 'NuGet Authenticate'

- task: NuGetCommand@2
  inputs:
    command: 'push'
    packagesToPush: '$(Build.ArtifactStagingDirectory)/**/*.nupkg;!$(Build.ArtifactStagingDirectory)/**/*.symbols.nupkg'
    nuGetFeedType: 'internal'
    publishVstsFeed: '<your-feed-id>'
```

While the steps themselves are self-explanatory, the only additional thing we have done is make the build follow semantic versioning by using variables.
The nice thing about this is test results are integrated right in the UI.
![](/content/images/2020/05/image.png)

(Next would be setup code coverage report)</p>

## Debugging Local 
There are cases in which we wanted to debug the packages as part of the main project. Here's where the nice dotnet tool <a href="https://github.com/RicoSuter/DNT">DNT</a> comes in 
Following the instructions <a href="https://github.com/RicoSuter/DNT#switch-to-projects">https://github.com/RicoSuter/DNT#switch-to-projects</a> a simple json file and two batch files later we have a completed local debug workflow.
