package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "books")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Book {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    private String name;
    private String author;
    private String isbn;
    private float price;
    private int inventory;
    private int is_delete;

    public int getId() {return id;}

    public String getName() {return this.name;}
    public void setName(String name) {this.name=name;}

    public String getAuthor() {return this.author;}
    public void setAuthor(String author) {this.author=author;}

    public String getIsbn() {return this.isbn;}
    public void setIsbn(String isbn) {this.isbn=isbn;}

    public float getPrice() {return this.price;}
    public void setPrice(float price) {this.price=price;}

    public int getInventory() {return inventory;}
    public void setInventory(int inventory) { this.inventory=inventory; }

    public int getIs_delete() {return is_delete;}
    public void setIs_delete(int is_delete) { this.is_delete=is_delete; }


    @Transient
    private BookMore bookmore;
    public BookMore getBookmore(){ return bookmore; }
    public void setBookmore(BookMore bookmore) { this.bookmore = bookmore; }
    public String getPicture() {return bookmore.getPicture();}
}
