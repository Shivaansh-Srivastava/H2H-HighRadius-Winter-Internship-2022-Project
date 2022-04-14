package com.highradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.sql.*;

import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/asData")
public class AsServlet extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
	//private static final long serialVersionUID=1L;
	private String url="jdbc:mysql://localhost:3306/grey_goose";
	private String uname="root";
	private String pass="i10122001";
	ArrayList<Invoice> AllInvoice = new ArrayList<Invoice>();
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		HashMap<Object,Object> Response = new HashMap<Object,Object>();
		String as_doc_id=request.getParameter("doc_id");
		String as_inv_id=request.getParameter("inv_id");
		String as_cus_no=request.getParameter("cus_no");
		String as_bus_yr=request.getParameter("bus_yr");
		
		System.out.println(as_doc_id+" "+as_inv_id+" "+as_cus_no+" "+as_bus_yr);
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		}catch(ClassNotFoundException e)
		{
			System.out.println("Class not found "+e);
		}
		
		try {
			int sl_no;
            String business_code="";
            long cust_number;
            String clear_date="";
            int buisness_year;
            long doc_id;
            String posting_date="";
            String document_create_date="";
            String due_in_date="";
            String invoice_currency="";
            String document_type="";
            int posting_id;
            double total_open_amount;
            String baseline_create_date="";
            String cust_payment_terms="";
            long invoice_id;
			
            Connection conn = DriverManager.getConnection(url,uname,pass);
            Statement st = conn.createStatement();
            String query="SELECT sl_no,business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id FROM winter_internship WHERE doc_id="+as_doc_id+" AND invoice_id="+as_inv_id+" AND cust_number="+as_cus_no+" AND buisness_year="+as_bus_yr+";";
            ResultSet rs = st.executeQuery(query);
            while(rs.next())
            {
            	Invoice obj = new Invoice();
            	sl_no=rs.getInt(1);
                business_code=rs.getString(2);
                cust_number=rs.getLong(3);
                clear_date=rs.getString(4);
                buisness_year=rs.getInt(5);
                doc_id=rs.getLong(6);
                posting_date=rs.getString(7);
                document_create_date=rs.getString(8);
                due_in_date=rs.getString(9);
                invoice_currency=rs.getString(10);
                document_type=rs.getString(11);
                posting_id=rs.getInt(12);
                total_open_amount=rs.getDouble(13);
                baseline_create_date=rs.getString(14);
                cust_payment_terms=rs.getString(15);
                invoice_id=rs.getLong(16);
                
                obj.setSl_no(sl_no);
                obj.setBusiness_code(business_code);
                obj.setCust_number(cust_number);
                obj.setClear_date(clear_date);
                obj.setBuisness_year(buisness_year);
                obj.setDoc_id(doc_id);
                obj.setPosting_date(posting_date);
                obj.setDocument_create_date(document_create_date);
                obj.setDue_in_date(due_in_date);
                obj.setInvoice_currency(invoice_currency);
                obj.setDocument_type(document_type);
                obj.setPosting_id(posting_id);
                obj.setTotal_open_amount(total_open_amount);
                obj.setBaseline_create_date(baseline_create_date);
                obj.setCust_payment_terms(cust_payment_terms);
                obj.setInvoice_id(invoice_id);
                
                AllInvoice.add(obj);
            }
            
            Gson gson = new Gson();
            String result = gson.toJson(AllInvoice);
            response.setHeader("Access-Control-Allow-Origin","*");
            response.getWriter().print(result);
            
            System.out.println("Connection closed");
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
