package com.example.demo.constant;

public class UserAndNumber {

    private String username;
    private int number;
    private float tot_price;

    public void setUsername(String username) {this.username=username;}
    public String getUsername() {return this.username;}
    public void setNumber(int number) {this.number=number;}
    public int getNumber() {return this.number;}
    public void setTot_price(float tot_price) {this.tot_price=tot_price;}
    public float getTot_price() {return this.tot_price;}

    public UserAndNumber(String username ,int number, float tot_price)
    {
        this.username=username;
        this.number=number;
        this.tot_price=tot_price;
    }

}

