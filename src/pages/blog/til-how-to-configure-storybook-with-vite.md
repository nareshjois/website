---
layout: "../../layouts/BlogPost.astro"
title: "TIL: How to configure Storybook with Vite"
description: ""
pubDate: "2022-04-04T12:13:29.000Z"
heroImage: ""
slug: "til-how-to-configure-storybook-with-vite"
tags: ["Development"]
---

Storybook based component development has helped us increase consistency and achieve quicker turn around time for our front-end development. We are currently moving our stack to use Vite (will post on this soon), we have been using react for all for front-end needs, while the process was straight forward, we did face some issues like all JS frameworks to get it working smoothly.

## Quick Setup

```bash
npx sb init --builder storybook-builder-vite
```
<br/>
<br/>
While this does download and add dependencies the main storybook doesn't run in first go

- Issue 1: Incorrect story paths: Do have a look at main.js under .storybook to ensure that the stories are being picked up correctly.
- Issue 2: `index.js:958 Uncaught ReferenceError: global is not defined` This actually comes from @storybook/addon-interactions plugin, and we disabled this plugin in main.js. This is no longer the case with 0.1.22 @storybook/builder-vite
- Issue 3: The default config also tries to inject the following line into components. We at least have this line in our jsx anyway so we had to comment this out. `import React from 'react'`