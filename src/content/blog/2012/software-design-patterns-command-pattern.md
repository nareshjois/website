---
title: "Software Design Patterns : Command Pattern"
description: ""
pubDate: "2012-01-29T01:50:03.000Z"
heroImage: ""
slug: "software-design-patterns-command-pattern"
tags: [".net"]
---

So as promised we are starting off with command pattern. I feel that the command pattern is simple and highly reusable.
This is also called an Action pattern, and the pattern is just that it represents an action as an object, and this pattern completely decouples the client from the inner working of the command. The command is self contained meaning it handles its own dependencies and requirements, the client is just responsible for calling the command. The advantage of this being you can build an extensible framework of actions and you would not have to write up the complex logic of looking up a command and passing arguments into it. This implementation also allows you to do a batch command processing, Logging also become easier as the execution of a command can be used to enforce logging, so does the reversal of the command,
Let me start off with an example. Even though I could have started off with a command line utility as all others do, I would take the much harder route and actually show you a real-world example, A WYSIWIG Text Editor with Simple Formatting Options. (This is would really be a very simple editor).
So start off with the base command structure, it's just an interface with a single method which doesn't accept any parameters.
```csharp
    public interface ICommand 
    {
        void ApplyFormatting();
    }
```
Because we will be working with a Text Editor, let me go ahead and setup a class which will serve as the base for all the toggle commands. Note that to keep things simple I have oversimplified the implementation and also basically limited myself to three actions, but you get the idea. Down the line I will update this to be more proper.

**ToggleCommand.cs (Base class):**
```csharp
public abstract class ToggleCommand : ICommand, INotifyPropertyChanged
{
    public RichTextBox TextEditor { get; set; }
    public event PropertyChangedEventHandler PropertyChanged;

    public void NotifyPropertyChanged(string Property)
    {
        if (PropertyChanged != null) PropertyChanged(this, new PropertyChangedEventArgs(Property));
    }

    public ToggleCommand(RichTextBox TextEd)
    {
        TextEditor = TextEd;
        TextEditor.KeyDown += (s, e) => { NotifyPropertyChanged("IsChecked"); };
        TextEditor.MouseClick += (s, e) => { NotifyPropertyChanged("IsChecked"); };
    }

    public abstract bool IsChecked { get; }
    public abstract void ApplyFormatting();

    protected void ApplyToggle(FontStyle Style)
    {
        var condition = (Style == FontStyle.Bold) ? TextEditor.SelectionFont.Bold : 
            (Style == FontStyle.Italic) ? TextEditor.SelectionFont.Italic : TextEditor.SelectionFont.Underline;
        if (condition)
            TextEditor.SelectionFont = new Font(TextEditor.SelectionFont.FontFamily, 
                TextEditor.SelectionFont.Size, TextEditor.SelectionFont.Style ^ Style);
        else
            TextEditor.SelectionFont = new Font(TextEditor.SelectionFont.FontFamily, 
                TextEditor.SelectionFont.Size, TextEditor.SelectionFont.Style | Style);
    }

    protected bool IsFormattingApplied(FontStyle Style)
    {
        if (TextEditor.SelectionLength > 0)
        {
            var condition = (Style == FontStyle.Bold) ? TextEditor.SelectionFont.Bold : 
                (Style == FontStyle.Italic) ? TextEditor.SelectionFont.Italic : TextEditor.SelectionFont.Underline;
            return condition;
        }
        else
        {
            var i = TextEditor.SelectionStart;
            TextEditor.Select(i, 1);
            var condition = (Style == FontStyle.Bold) ? TextEditor.SelectionFont.Bold : 
                (Style == FontStyle.Italic) ? TextEditor.SelectionFont.Italic : TextEditor.SelectionFont.Underline;
            TextEditor.Select(i, 0);
            return condition;
        }
    }
}
```

**BoldCommand.cs:**
```csharp
class BoldCommand : ToggleCommand
{
    public BoldCommand(RichTextBox TextControl) : base(TextControl) { }

    public override void ApplyFormatting()
    {
        ApplyToggle(FontStyle.Bold);
        NotifyPropertyChanged("IsChecked");
    }

    public override bool IsChecked => IsFormattingApplied(FontStyle.Bold);
}
```

**ItalicCommand.cs:**
```csharp
public class ItalicCommand : ToggleCommand
{
    public ItalicCommand(RichTextBox TextControl) : base(TextControl) { }

    public override bool IsChecked => IsFormattingApplied(FontStyle.Italic);

    public override void ApplyFormatting()
    {
        ApplyToggle(FontStyle.Italic);
        NotifyPropertyChanged("IsChecked");
    }
}
```

**UnderlineCommand.cs:**
```csharp
public class UnderlineCommand : ToggleCommand
{
    public UnderlineCommand(RichTextBox TextControl) : base(TextControl) { }

    public override bool IsChecked => IsFormattingApplied(FontStyle.Underline);

    public override void ApplyFormatting()
    {
        ApplyToggle(FontStyle.Underline);
        NotifyPropertyChanged("IsChecked");
    }
}
```

As mentioned, the command takes care of all the requirements and is self-contained. As we are working on a WYSIWYG editor, the command needs a RichTextEditor to work with, and implements the ICommand interface. I have also made this implement INotifyPropertyChanged and introduced a property which exposes the state text at current position.
From then on its straight forward implement this class
To Visualize this
![](/content/images/2013/Dec/command_pattern_design_1.png)
Due to All this the client is very simple
```csharp
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
```


