---
layout: "../../layouts/BlogPost.astro"
title: "Using a ASP.net Grid view using code"
description: ""
pubDate: "2007-11-18T09:58:41.000Z"
heroImage: ""
slug: "using-a-aspnet-grid-view-using-code"
tags: ["Tech"]
---

We have all used grid view along with data sources but some time you need to to that from code, the problem is most of us do not know how to use this from code, but Its not that difficult to that. Here's a simple way to do that.

A Simple grid  First column is a readonly templated field, second one a readonly bound field and third a templated entry field. At the Edit the edit command Field
First Write a Function for loading data which will be reused on every action. I call it BindData()

```aspx
<asp:GridView ID="GridView1" runat="server"  CssSelectorClass="PrettyGridView" PageSize="50" AllowSorting="True"   AutoGenerateColumns="False" EnableSortingAndPagingCallbacks="True">
   <columns>
   <asp:templatefield HeaderText="Center Id" SortExpression="center_Id">
   <edititemtemplate>
   <asp:Label ID="Label10" runat="server" Text='<%# Eval("bind1") %>'/>    </edititemtemplate>
   <itemtemplate>
   <asp:Label ID="Label10" runat="server" Text='<%# Bind("bind1") %>'/>    </itemtemplate>
   </asp:templatefield>
   <asp:boundfield DataField="City_Name" HeaderText="City Name"            ReadOnly="True" SortExpression="City_Name"></asp:boundfield>
   <asp:templatefield HeaderText="Rate">
   <edititemtemplate>
   <asp:TextBox ID="TextBox1" runat="server" Text='<%# Bind("bind2") %>'/>    </edititemtemplate>
   <itemtemplate>
   <asp:Label ID="Label1" runat="server" Text='<%# Bind("bind2") %>'/>    </itemtemplate>
   </asp:templatefield>
   <asp:commandfield ShowEditButton="True"></asp:commandfield>
   </columns>
</asp:GridView>
```

and the code behind

```vb
Private Sub BindData()        
       conn = New OleDbConnection(GetJetConnectionString)
       adap = New OleDbDataAdapter("Custom SQL Query", conn)
       Dim datatable1 As New DataTable
       adap.Fill(datatable1)
       dataset1 = New DataSet
       dataset1.Tables.Add(datatable1)
       Me.GridView1.DataSource = dataset1
       Me.GridView1.DataBind() 
End Sub

Protected Sub GridView1_RowEditing(ByVal sender As Object,          ByVal e As System.Web.UI.WebControls.GridViewEditEventArgs)          Handles GridView1.RowEditing
    GridView1.EditIndex = e.NewEditIndex
    BindData()
    Dim row As GridViewRow = GridView1.Rows(GridView1.EditIndex)
    If row IsNot Nothing Then
        Dim t As TextBox = TryCast(row.FindControl("TextBox1"), TextBox)
        If t IsNot Nothing Then
            ViewState("OldRate") = t.Text
        End If
    End If
End Sub


Protected Sub GridView1_RowCancelingEdit(ByVal sender As Object, ByVal e As System.Web.UI.WebControls.GridViewCancelEditEventArgs)         Handles GridView1.RowCancelingEdit
   GridView1.EditIndex = -1
   BindData()
 End Sub
 
 
 Protected Sub GridView1_RowUpdating(ByVal sender As Object,          ByVal e As System.Web.UI.WebControls.GridViewUpdateEventArgs)          Handles GridView1.RowUpdating
    Dim new_rate, old_rate As String
    old_rate = ViewState("OldRate")
    Dim row As GridViewRow = GridView1.Rows(e.RowIndex)
    If row IsNot Nothing Then
        Dim t As TextBox = TryCast(row.FindControl("TextBox1"), TextBox)
        If t IsNot Nothing Then
            new_rate = t.Text
            If new_rate = "" Then
                GridView1.EditIndex = -1
                BindData()
                Exit Sub
            End If
            If new_rate = old_rate Then
                GridView1.EditIndex = -1
                BindData()
                Exit Sub
            Else
                Dim label1 As Label = TryCast(row.FindControl("label10"), Label)
                Dim center_id As String = label1.Text
                Dim conn As New OleDbConnection(ConnectionString)
                Dim cmd As New OleDbCommand
                cmd.Connection = conn
                cmd.CommandType = CommandType.Text
                Dim SQL As String
                If old_rate = "" Then
                    SQL = "INSERT INTO QUERY"
                Else
                    SQL = "UPDATE QUERY"
                End If
                cmd.CommandText = SQL
                conn.Open()
                cmd.ExecuteNonQuery()
                conn.Close()
                GridView1.EditIndex = -1
                BindData()
            End If
        Else
            GridView1.EditIndex = -1
            BindData()
        End If
    End If
End Sub
```

Now since the gridview is binded from code we have to handle all its events. So When the user clicks on edit. Here I have done two things  one is enable editing mode, then I store the data of textbox in a viewstate, so that it can be accessed later when updating, please remember that the regular method of e.OldValues and e.NewValues Will not work because we have to do that manually, (which can be done, but for our purposes we will use viewstate)
Now for the cancel part
Now for the update part. First new value is found out, if it is blank nothing is done, if old value does not Exist INSERT command is used if old value does exist UPDATE command is used. Here I did a Simple SQL execution but I think you will figure out a better way

