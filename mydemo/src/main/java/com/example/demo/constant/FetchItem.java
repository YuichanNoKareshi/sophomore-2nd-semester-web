package com.example.demo.constant;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.BookMore;

public class FetchItem {

    private String name;
    private String picture;
    private int number;
    private float prices;

    public void setBook(Book book) {
        this.name = book.getName();
        BookMore bookMore=book.getBookmore();
        this.picture = bookMore.getPicture();
    }

    public void setName(String name) { this.name = name; }
    public String getName() {return this.name;}

    public void setPicture(String picture) { this.picture = picture; }
    public String getPicture() {return this.picture;}

    public void setNumber(int number) { this.number = number; }
    public int getNumber() {return this.number;}

    public void setPrices(float prices) { this.prices = prices; }
    public float getPrices() {return this.prices;}

}
