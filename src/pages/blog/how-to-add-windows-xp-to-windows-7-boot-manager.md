---
layout: "../../layouts/BlogPost.astro"
title: "How to Add Windows XP to Windows 7 Boot Manager"
description: ""
pubDate: "2010-03-23 22:13:03"
heroImage: ""
slug: "how-to-add-windows-xp-to-windows-7-boot-manager"
---

1. Open an elevated command prompt.
2. Type the following to create a boot loader for Windows XP.
bcdedit /create {ntldr} /d "Windows XP"
3. Type the following to set the device to where Windows XP is installed. I used D: in this example. Replace it with the drive letter of your XP installation.
bcdedit /set {ntldr} device partition=D:
4. Type the following to set the path.
bcdedit /set {ntldr} path \ntldr
5. Type the following to add this boot loader to the boot up screen.
bcdedit /displayorder {ntldr} /addlast
6. Reboot the computer
.
