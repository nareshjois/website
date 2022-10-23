---
layout: "../../layouts/BlogPost.astro"
title: "Switching to a Sun JVM in RHEL"
description: ""
pubDate: "2007-09-03 22:32:13"
heroImage: ""
slug: "switching-to-a-sun-jvm-in-rhel"
---

RedHat by default supplies GNU Java tools (GJC). The IBM JDK or the BEA JDK are in the "extra" channel. But what if you want to use the Sun JDK...
Current licensing (2007/05) doesn't allow Sun JDK to be distributed by RedHat. (Maybe this will change with openJava?) Fortunately RedHat is actively involved with JPackage which makes it fully JPackage compatible! (hooray!)
If you use this guide, then the entire system will end up using the Sun JDK.
<h4><em>check the current java(c) version:</em></h4>
<pre lang="bash">$ java -version</pre>
[probably the GNU one]
<pre lang="bash">$ javac -version</pre>
[probably the Eclipse Java Compiler]
<h4>Install the Sun JDK</h4>
<ol>
	<li>get the latest Sun JDK RPM:
Go to the directory where you want to download, extract and install (eg: cd /tmp, cd /root).
<pre lang="bash">$ links http://java.sun.com/javase/downloads/index.jsp</pre>
Choose the link to the latest JDK.
On the download page: accept the agreement in links and download the JDK RPM-in-bin for linux.</li>
	<li>Make the downloaded binary executable and run it:
<pre lang="bash">$ chmod u+x jdk-<version>-linux-i586-rpm.bin
$ ./jdk-<version>-linux-i586-rpm.bin</pre>
The rpm is extracted from the bin and installed (accept the license).
The java version is now installed in /usr/java/. This dir contains all individual versions and two symlinks: "latest" and "default". You should never reference to any of these locations (see 4).</li>
	<li>Get the matching JPackage compatibility package for <strong>this</strong> Sun JDK:
<pre lang="bash">$ links ftp://jpackage.hmdc.harvard.edu/JPackage/1.7/generic/RPMS.non-free/
$ rpm -ivh java-x.x.x-sun-compat-x.x.x.xx-1jpp.i586.rpm</pre>
</li>
	<li>To make the Sun JDK the default for the entire system, use the 'alternatives' method. This will create symlinks in /etc/alternatives/ that are used throughout the entire system (eg see "$ ll /usr/bin/java").
[select the Sun version instead of the GNU version for each of these commands]
<pre lang="bash">$ /usr/sbin/alternatives --config java
$ /usr/sbin/alternatives --config javac</pre>
</li>
</ol>
<h4><em>check the new installation</em></h4>
<pre lang="bash">$ java -version</pre>
[should be the new Sun version]
<pre lang="bash">$ javac -version</pre>
[should be the new Sun version]
