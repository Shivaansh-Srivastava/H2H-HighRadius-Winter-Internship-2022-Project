package com.highradius;

import java.io.IOException;
import java.util.HashMap;
import java.sql.Date;

import com.google.gson.Gson;

import java.sql.*;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/AddData")
public class AddServlet extends HttpServlet
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String url="jdbc:mysql://localhost:3306/grey_goose";
	private String uname="root";
	private String pass="i10122001";
	//private String query;
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		try 
		{
			HashMap<Object,Object> Response = new HashMap<Object,Object>();
			String business_code = request.getParameter("business_code");
			String cust_number =  request.getParameter("cust_number");
			String clear_date = request.getParameter("clear_date");
			String buisness_year = request.getParameter("buisness_year");
			String doc_id = request.getParameter("doc_id");
			String posting_date = request.getParameter("posting_date");
			String document_create_date = request.getParameter("document_create_date");
			String due_in_date = request.getParameter("due_in_date");
			String invoice_currency = request.getParameter("invoice_currency");
			String document_type = request.getParameter("document_type");
			String posting_id = request.getParameter("posting_id");
			String total_open_amount = request.getParameter("total_open_amount");
			String baseline_create_date = request.getParameter("baseline_create_date");
			String cust_payment_terms = request.getParameter("cust_payment_terms");
			String invoice_id = request.getParameter("invoice_id");
			
			//Date new_clear_date=Date.valueOf(clear_date);
            
			String resp = "Hrdata [business_code=" + business_code + ", cust_number=" + cust_number
					+ ", clear_date=" + clear_date +", doc_id=" + doc_id +", buisness_year=" + buisness_year + ", posting_date=" + posting_date +
					", document_create_date=" + document_create_date +", due_in_date=" + due_in_date +", invoice_currency=" + invoice_currency
					+ ", document_type=" + document_type + ", posting_id=" + posting_id + ", total_open_amount="
					+ total_open_amount + ", baseline_create_date=" + baseline_create_date + ", cust_payment_terms=" + cust_payment_terms + ", invoice_id=" + invoice_id + "]";
		    System.out.println(resp);
			
            //query="insert into winter_internship(business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn=DriverManager.getConnection(url,uname,pass);
            
            String query = "INSERT INTO winter_internship (business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			PreparedStatement statement = conn.prepareStatement(query);
			
			statement.setString(1,business_code);//business_code
			statement.setInt(2,Integer.parseInt(cust_number));//name_customer` varchar(255
			statement.setDate(3,Date.valueOf(clear_date));//clear_date	
			statement.setInt(4,Integer.parseInt(buisness_year));//business_year` year(4)
			statement.setString(5,doc_id);//doc_id` 
			statement.setDate(6,Date.valueOf(posting_date));//posting_date` date
			statement.setDate(7,Date.valueOf(document_create_date));//document_create_date
			statement.setDate(8,Date.valueOf(due_in_date));//due_in_date` date
			statement.setString(9,invoice_currency); //invoice_currency` char(3)
			statement.setString(10,document_type);  //document_type` char(2
			statement.setInt(11,Integer.parseInt(posting_id));  //posting_id` 
			statement.setDouble(12,Double.parseDouble(total_open_amount));   //total_open_amount` double
			statement.setDate(13,Date.valueOf(baseline_create_date));	//baseline_create_date` date
			statement.setString(14,cust_payment_terms);	//cust_payment_terms` char(4) 
			statement.setInt(15,Integer.parseInt(invoice_id));	//invoice_id` 
			//statement.setLong(15,Long.parseLong(invoice_id));
			//statement.executeUpdate();
			//conn.close();
            
            
            if(statement.executeUpdate() > 0)
            {
            	Response.put("status",true);
            }
            else
            {
            	Response.put("status",true);
            }
            Gson gson = new Gson();
            String ResponseJSON = gson.toJson(Response);
            response.setHeader("Access-Control-Allow-Origin","*");
            response.getWriter().append(ResponseJSON);
            System.out.println(ResponseJSON);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
