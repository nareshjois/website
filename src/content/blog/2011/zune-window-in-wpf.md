---
title: "Zune Window in WPF"
description: ""
pubDate: "2011-07-04T16:00:53.000Z"
heroImage: ""
slug: "zune-window-in-wpf"
tags: [".net"]
---

I have become a huge fan of Metro UI design and I really like the Zune interface. The starting point would be the custom chrome, so I searched a bit and found this neat little thing - thought I would share:

```csharp
public class BorderlessWindowBehavior : Behavior<Window>
{
    #region Native Methods
    [StructLayout(LayoutKind.Sequential)]
    public struct MARGINS
    {
        public int leftWidth;
        public int rightWidth;
        public int topHeight;
        public int bottomHeight;
    }

    [DllImport("dwmapi.dll")]
    private static extern int DwmExtendFrameIntoClientArea(IntPtr hWnd, ref MARGINS pMarInset);

    [StructLayout(LayoutKind.Sequential)]
    public struct POINT
    {
        public int x;
        public int y;
        public POINT(int x, int y) { this.x = x; this.y = y; }
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct MINMAXINFO
    {
        public POINT ptReserved;
        public POINT ptMaxSize;
        public POINT ptMaxPosition;
        public POINT ptMinTrackSize;
        public POINT ptMaxTrackSize;
    }
    #endregion

    private const int WM_NCCALCSIZE = 0x83;
    private const int WM_NCPAINT = 0x85;
    private const int WM_NCACTIVATE = 0x86;
    private const int WM_GETMINMAXINFO = 0x24;

    private HwndSource m_hwndSource;
    private IntPtr m_hwnd;

    public static DependencyProperty ResizeWithGripProperty = 
        DependencyProperty.Register("ResizeWithGrip", typeof(bool), 
            typeof(BorderlessWindowBehavior), new PropertyMetadata(true));

    public bool ResizeWithGrip
    {
        get { return (bool)GetValue(ResizeWithGripProperty); }
        set { SetValue(ResizeWithGripProperty, value); }
    }

    protected override void OnAttached()
    {
        if (AssociatedObject.IsInitialized)
            AddHwndHook();
        else
            AssociatedObject.SourceInitialized += AssociatedObject_SourceInitialized;

        AssociatedObject.WindowStyle = WindowStyle.None;
        AssociatedObject.ResizeMode = ResizeWithGrip ? ResizeMode.CanResizeWithGrip : ResizeMode.CanResize;

        base.OnAttached();
    }

    private IntPtr HwndHook(IntPtr hWnd, int message, IntPtr wParam, IntPtr lParam, ref bool handled)
    {
        IntPtr returnval = IntPtr.Zero;

        switch (message)
        {
            case WM_NCCALCSIZE:
                handled = true;
                break;
            case WM_NCPAINT:
                if (Environment.OSVersion.Version.Major >= 6)
                {
                    var m = new MARGINS { bottomHeight = 1, leftWidth = 1, rightWidth = 1, topHeight = 1 };
                    DwmExtendFrameIntoClientArea(m_hwnd, ref m);
                }
                handled = true;
                break;
            case WM_NCACTIVATE:
                returnval = DefWindowProc(hWnd, message, wParam, new IntPtr(-1));
                handled = true;
                break;
            case WM_GETMINMAXINFO:
                WmGetMinMaxInfo(hWnd, lParam);
                handled = true;
                break;
        }

        return returnval;
    }
}
```
