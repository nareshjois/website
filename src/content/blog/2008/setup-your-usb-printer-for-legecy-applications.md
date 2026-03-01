---
title: "Setup your USB printer for legacy applications"
description: ""
pubDate: "2008-12-10T05:29:57.000Z"
heroImage: ""
slug: "setup-your-usb-printer-for-legecy-applications"
tags: ["Tech"]
---

If you have used legacy applications which always use the serial port (LPT1) as the default printing port, and you have no printer selection option (and even if you do and it doesn't show USB as an option, just LPT1 and LPT2) you could be scratching your head.

But wait, there is a fix and it's simple:
<ol>
	<li>Share your printer</li>
	<li>Note down the share name in format of \\Computer-Name\Printer-Name</li>
	<li>Go to command prompt and type in
<strong>net use lpt1: \\Computer-Name\Printer-Name /persistent:yes </strong></li>
</ol>
Here lpt1: can also be lpt2: if you use a serial port printer in lpt1 and persistent: yes makes this available even after reboot.
