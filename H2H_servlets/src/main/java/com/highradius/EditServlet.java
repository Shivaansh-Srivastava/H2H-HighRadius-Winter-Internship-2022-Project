package com.highradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.HashMap;
import java.sql.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/editServlet")
public class EditServlet extends HttpServlet
{
	private String url="jdbc:mysql://localhost:3306/grey_goose";
	private String uname="root";
	private String pass="i10122001";
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		HashMap<Object,Object> Response = new HashMap<Object,Object>();
		String invoice_currency=request.getParameter("invc");
		String cust_pay_terms=request.getParameter("cpt");
		String rid=request.getParameter("rid");
		System.out.println(invoice_currency+" "+cust_pay_terms+" "+rid);
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn=DriverManager.getConnection(url,uname,pass);
            String query="update winter_internship set invoice_currency=?, cust_payment_terms=? where sl_no=?;";
            PreparedStatement ps=conn.prepareStatement(query);
            ps.setString(1,invoice_currency);
            ps.setString(2, cust_pay_terms);
            ps.setInt(3,Integer.parseInt(rid));
            //ps.executeUpdate();
            if(ps.executeUpdate()> 0)
            {
            	Response.put("status",true);
            }
            else
            {
            	Response.put("status",true);
            }
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
