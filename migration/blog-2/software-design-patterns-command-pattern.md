---
layout: "../../layouts/BlogPost.astro"
title: "Software Design Patterns : Command Pattern"
description: ""
pubDate: "2012-01-29 01:50:03"
heroImage: ""
slug: "software-design-patterns-command-pattern"
---

So As Promissed we are Starting of with command pattern, I feel that the command pattern is simple and highly resuable,
This is also called an Action pattern, and the pattern is just that it represents an action as an object, and this pattern completely decouples the client to the inner working of the command, the command is self contained meaning it handles its own dependencies and requirements, the client is just responsible calling the command, The advanatage of this being you can build an extensible framework of actions and you would not e have to write up the complex logic of looking up a command and passing arguements into it. This implementation also allows you to do a batch command processing, Logging also become easier as the execution of a command can be used to enforce logging, so does the reversal of the command,
Let me start of with a example, Even though I could have started off with a command line utility as all others do, I would take the much harder route and acually show you a realworld example, A WYSIWIG Text Editor with Simple Formatting Options. (This is would really be a very simple editor).
So Start of with the base command structure, its just a interface with a single method which doesn't accept any parameters.
<pre lang="csharp">
    public interface ICommand 
    {
        void ApplyFormatting();
    }
</pre>
Because we will be working with a Text Editor Let me go ahead and setup a class which will serve as the base for the all the toggle commands, Note that to keep things simple I have oversimplified the implementation and also basically limited myself to three actions but you get the Idea. Down the line i will update this to be more proper.
<script src="https://gist.github.com/nareshjois/7897085.js"></script>
As mentioned the command takes care of all the requirements and is self contained, As we are working on WYSIWIG editor the command needs a RichTextEditor to work with, and implements the ICommand Interface, I have also made this implement the INotifyPropertyChanged and introduce a property which exposes the state text at current position.
From then on its straight forward implement this class
To Visualize this
![](/content/images/2013/Dec/command_pattern_design_1.png)
Due to All this the client is very simple
<pre lang="csharp">
 private void Form1_Load(object sender, EventArgs e)
        {
            actionToolStripButtonBold.Command = new BoldCommand(this.richTextBox1);
            actionToolStripButtonItalic.Command = new ItalicCommand(this.richTextBox1);
            actionToolStripButtonUnderline.Command = new UnderlineCommand(this.richTextBox1);
        }

        private void toolStrip1_ItemClicked(object sender, ToolStripItemClickedEventArgs e)
        {
            ((ActionToolStripButton)e.ClickedItem).Command.ApplyFormatting();
        }
</pre>


