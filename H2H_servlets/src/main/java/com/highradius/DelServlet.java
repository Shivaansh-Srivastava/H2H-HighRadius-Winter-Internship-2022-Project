package com.highradius;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.*;
import java.util.*;
import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;

import com.google.gson.Gson;

import org.json.HTTP;
import org.json.JSONException;
import org.json.JSONObject;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/delData")
public class DelServlet extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
	private String url="jdbc:mysql://localhost:3306/grey_goose";
	private String uname="root";
	private String pass="i10122001";
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		//ArrayList<Integer> ids = ArrayList<Integer>();
		String val=request.getParameter("del_list");
		HashMap<String,Integer> map = new Gson().fromJson(val, new TypeToken<HashMap<String,Integer>>(){}.getType());
		//System.out.println(map);
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn=DriverManager.getConnection(url,uname,pass);
            String query="delete from winter_internship where sl_no=?;";
            PreparedStatement ps=conn.prepareStatement(query);
            map.forEach((key,value) -> {
    			try {
					ps.setInt(1,value);
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
            	try {
					ps.execute();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
    		});
            //changes were made here
            //RequestDispatcher rd=request.getRequestDispatcher("/FetchServlet");  
            //rd.forward(request, response); 
		}catch(Exception e)
		{
			e.printStackTrace();
		}
	}
}
