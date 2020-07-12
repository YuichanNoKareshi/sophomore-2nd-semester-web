package com.example.demo.constant;

import com.example.demo.Entity.Order;

import javax.persistence.Basic;
import javax.persistence.Column;
import java.util.List;


public class FetchOrder {
    private String username;
    private int order_id;
    private double tot_price;
    private String date;
    private List<FetchItem> items;

    public int getOrder_id() { return order_id; }
    public void setOrder_id(int order_id) { this.order_id = order_id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public double getTot_price() { return tot_price; }
    public void setTot_price(double tot_price) { this.tot_price = tot_price; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public void setItems(List<FetchItem> items) { this.items = items; }
    public  List<FetchItem> getItems() {return this.items;}

    public void setOrder(Order order)
    {
        this.username=order.getUsername();
        this.order_id=order.getOrder_id();
        this.tot_price=order.getTot_price();
        this.date=order.getDate();
    }
}
