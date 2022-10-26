---
layout: "../../layouts/BlogPost.astro"
title: "Cannot Select Multiple Files in Vista"
description: ""
pubDate: "2007-12-14T20:13:28.000Z"
heroImage: ""
slug: "cannot-select-multiple-files-in-vista"
tags: ["Tech"]
---

I recently encountered this error on my friend's machine, had to search the net to find the solution but was worth the search, Here's how,
<ol>
	<li>Open <strong>Regedit</strong></li>
	<li>Navigate to <strong>HKCU\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\</strong></li>
	<li>Delete the <strong>Bags &amp; BagMRU</strong> keys</li>
</ol>
If this does not help end the explorer.exe process and restart
