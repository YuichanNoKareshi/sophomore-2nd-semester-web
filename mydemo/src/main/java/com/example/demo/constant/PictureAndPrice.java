package com.example.demo.constant;

public class PictureAndPrice {
    private String picture;
    private float price;
    public String getPicture() {return this.picture;}
    public void setPicture(String picture) {this.picture=picture;}
    public float getPrice() {return this.price;}
    public void setPrice(float price) {this.price=price;}
    public PictureAndPrice(String picture,float price) {this.picture=picture;this.price=price;}
}
