---
title: "Serialize and Deserialize object as XML"
description: ""
pubDate: "2008-12-06T15:31:32.000Z"
heroImage: ""
slug: "serialize-and-deserialize-object-as-xml"
tags: [".net"]
---

If you ever wanted to store an in-memory object, I think serialization is the best possible method to do so. The same applies when you want to transport an object. I was using this for a long time now, and I have modified it a bit with generics:

```csharp
using System.Collections.Generic;
using System.Text;
using System.Xml;
using System.IO;
using System.Xml.Serialization;

public class XMLSerializer {
    private static string UTF8ByteArrayToString(byte[] characters)
    {
        UTF8Encoding encoding = new UTF8Encoding();
        string constructedString = encoding.GetString(characters);
        return (constructedString);
    }

    private static Byte[] StringToUTF8ByteArray(string pXmlString)
    {
        UTF8Encoding encoding = new UTF8Encoding();
        byte[] byteArray = encoding.GetBytes(pXmlString);
        return byteArray;
    }

    public static string SerializeObject<T>(T obj)
    {
        try
        {
            string xmlString = null;
            MemoryStream memoryStream = new MemoryStream();
            XmlSerializer xs = new XmlSerializer(typeof(T));
            XmlTextWriter xmlTextWriter = new XmlTextWriter(memoryStream, Encoding.UTF8);
            xs.Serialize(xmlTextWriter, obj);
            memoryStream = (MemoryStream)xmlTextWriter.BaseStream;
            xmlString = UTF8ByteArrayToString(memoryStream.ToArray());
            return xmlString;
        }
        catch
        {
            return string.Empty;
        }
    }

    public static T DeserializeObject<T>(string xml)
    {
        XmlSerializer xs = new XmlSerializer(typeof(T));
        MemoryStream memoryStream = new MemoryStream(StringToUTF8ByteArray(xml));
        XmlTextWriter xmlTextWriter = new XmlTextWriter(memoryStream, Encoding.UTF8);
        return (T)xs.Deserialize(memoryStream);
    }
}
```
