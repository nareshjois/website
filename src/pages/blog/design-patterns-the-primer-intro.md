---
layout: "../../layouts/BlogPost.astro"
title: "Software Design Patterns : The Primer : Introduction"
description: ""
pubDate: "2012-01-27T17:18:58.000Z"
heroImage: ""
slug: "design-patterns-the-primer-intro"
tags: [".net"]
---

My primary work is designing. I earn my living by designing applications small and large. And because designing software more or less is bringing solution to problem, the steps you take also are similar. You break down the problem, you solve each piece using either your existing knowledge of learn from others and the complete the solution, you reuse the same methods to solve the same kind of problems. This is what is called a pattern,  a pattern is all about how you approach the problem, its not about semantics on how you solve a particular piece.

Software Design patterns are also the same, its about how you solve common problems that are encountered every time you design a software. A pattern has less to do with actual code and more to do with the approach(or can be eloquently put as less to do with algorithms). And patterns are abstractions over code meaning there is no set conventions on a pattern like naming of classes etc, and also that these patterns have no barrier of programming language, there are some specific cases where few patters make more sense on a particular programming platform, but in general you should be able to use them across languages and platforms. And if you are into LOB applications its pretty certain that somebody else has already solved the problem that you are facing. So Its better to know about the existing patterns and how they can help you solve your problems, and Patterns range wide, starting from a very simple one which makes say a Data Structure mode bind able to issues in enterprise architecture.

Design Patterns can be classified into categories based on what problems you are trying to solve and the list is fairly extensive, just to pull of few on top of my head
<ul>
	<li>Creation</li>
	<li>Functional</li>
	<li>Parallel Programming</li>
	<li>Behavioral</li>
	<li>Security</li>
	<li>User Interface</li>
	<li>Concurrency</li>
	<li>Distributed Computing</li>
	<li>Relational</li>
</ul>
and the list is growing and as new problems and new ways of solving them are found.

So the big question why should I care about Design Patterns ?, The simplest answer for this question is that you do not reinvent a wheel, the problem you are facing in software architecture is not always unique and understanding patterns will get you started quickly in solving the problems. Benefits also include decrease in effort and improvement in development time, and the application will generally have a better design and can be universally understandable.

So What Next? Over the next series of posts I plan to put information on few of the simple patters to more complex ones, I am trying to make this as simple as possible and get the discussion started, and even though design patters are fairly simple to understand what I would be writing is just my understanding and experience and should not be considered the final authority. I also plan to do simple implementation examples and again those would be just mine. For the simpler Patterns i would be using C# as the language but down the line when we get to say MVVM I also plan to include some iOS Code.

To begin with I will be writing about the Command Pattern which according to me is a highly reused pattern.
