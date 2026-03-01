---
title: "Vista Style Command link"
description: ""
pubDate: "2008-11-28T03:45:35.000Z"
heroImage: "/content/images/2013/Dec/commandlinks.jpg"
slug: "vista-style-command-link"
tags: [".net"]
---

Have you observed the new TaskDialog in Vista? (Maybe I am the last one to write about this), but it sure looks great, and it is easy to implement. There are lots of versions out there but I like this the most, so here is the code:

```csharp
using System;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Windows.Forms;

namespace CommandLink
{
    [ToolboxBitmap(typeof(Button))]
    [DefaultEvent("Click")]
    public partial class CommandLink : Button
    {
        public CommandLink()
        {
            InitializeComponent();
            this.DoubleBuffered = true;
            this.ImageVerticalAlign = VerticalAlign.Middle;
        }

        #region Fields
        public enum State
        {
            Normal,
            Hover,
            Pushed,
            Disabled
        }

        public enum VerticalAlign
        {
            Top,
            Middle,
            Bottom
        }

        private State state = State.Normal;
        private int offset = 0;

        private string headerText = "Header Text";
        private string descriptionText = "Description";

        private Bitmap image;
        private Bitmap grayImage;
        private Size imageSize = new Size(24, 24);
        private VerticalAlign imageAlign = VerticalAlign.Top;
        private VerticalAlign textAlign = VerticalAlign.Middle;

        private Font descriptFont;
        #endregion

        #region Properties
        [Category("Command Appearance"),
         Browsable(true),
         DefaultValue("Header Text")]
        public string HeaderText
        {
            get { return headerText; }
            set { headerText = value; this.Refresh(); }
        }

        [Category("Command Appearance"),
         Browsable(true),
         DefaultValue("Description")]
        public string DescriptionText
        {
            get { return descriptionText; }
            set { descriptionText = value; this.Refresh(); }
        }

        [Category("Command Appearance"),
         Browsable(true),
         DefaultValue(null)]
        public Bitmap Image
        {
            get { return image; }
            set
            {
                if (image != null) image.Dispose();
                if (grayImage != null) grayImage.Dispose();
                image = value;
                if (image != null)
                    grayImage = GetGrayscale(image);
                else
                    grayImage = null;
                this.Refresh();
            }
        }
        #endregion

        // ... (additional implementation details)
    }
}
```

I will also post the complete task dialog in my next post. I did not write this code—credit to whoever wrote it.
