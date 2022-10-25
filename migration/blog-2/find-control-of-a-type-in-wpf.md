---
layout: "../../layouts/BlogPost.astro"
title: "Find Control of a Type in WPF"
description: ""
pubDate: "2012-01-04 19:07:40"
heroImage: ""
slug: "find-control-of-a-type-in-wpf"
---

I had previously written a piece of Code to retrieve a control of a single type in ASP.net, now working on WPF I had to do basically the same thing, and VisualTreeHelper came to the rescue.

In this process I discovered that if the content of the user control/window is a scroll panel you have to reference the scroll panel. so without further blabber , here is the code. (Please Note that this also works with controls inside a groupbox)

<pre lang="csharp">
   public static class VisualEnumerable
    {
        /// <summary>
        /// Gets the Visual Tree filtered by Type for a DependencyObject with that DependencyObject as the root.
        /// </summary>
        public static IEnumerable<t> GetVisualOfType</t><t>(this DependencyObject element)
        {
            var temp = GetVisualTree(element).ToList();
            return temp.Where(t => t.GetType() == typeof(T)).Cast</t><t>();
        }

        /// <summary>
        /// Gets the Visual Tree for a DependencyObject with that DependencyObject as the root.
        /// </summary>
        public static IEnumerable<dependencyobject> GetVisualTree(this DependencyObject element)
        {
            int childrenCount = VisualTreeHelper.GetChildrenCount(element);

            for (int i = 0; i < childrenCount; i++)
            {
                var visualChild = VisualTreeHelper.GetChild(element, i);
                if (visualChild != null) yield return visualChild;

                if (visualChild is GroupBox)
                {
                    var gb = visualChild as GroupBox;
                    object gpChild = gb.Content;
                    yield return visualChild;
                    visualChild = (DependencyObject)gpChild;
                }

                foreach (var visualChildren in GetVisualTree(visualChild))
                {
                    yield return visualChildren;
                }
            }
        }
    }
</pre>
To Use this you can simply do
<pre lang="csharp">
var textboxes = this.MainPanel.GetVisualOfType<textbox>()
</pre>
