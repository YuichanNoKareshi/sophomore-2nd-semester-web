package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.*;
import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "likes")
@IdClass(Like_keys.class)
public class Like implements Serializable {
    @Id
    private String username;
    @Id
    private int book_id;
    private String book_name;
    private int tot_number;
    private float tot_price;
    private int inventory;

    public void setUsername(String username) {this.username=username;}
    public String getUsername() {return username;}

    public void setBook_id(int book_id) {this.book_id=book_id;}
    public int getBook_id() {return this.book_id;}

    public void setBook_name(String book_name) {this.book_name=book_name;}
    public String getBook_name() {return this.book_name;}

    public void setTot_number(int tot_number) {this.tot_number=tot_number;}
    public int getTot_number() {return this.tot_number;}

    public void setTot_price(float tot_price) {this.tot_price=tot_price;}
    public float getTot_price() {return this.tot_price;}

    public void setInventory(int inventory) {this.inventory=inventory;}
    public int getInventory() {return this.inventory;}


}


