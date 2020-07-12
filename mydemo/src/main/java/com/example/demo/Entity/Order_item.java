package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;


import javax.persistence.*;


@Data
@Entity
@Table(name = "order_items")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "item_id")
public class Order_item {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "item_id")
    private int item_id;
    public int getItem_id() {return this.item_id;}

    private int book_id;
    private int number;
    private int order_id;

    @Basic
    @Column(name = "book_id")
    public int getBook_id() { return book_id; }

    public void setBook_id(int book_id) { this.book_id = book_id; }

    @Basic
    @Column(name = "number")
    public int getNumber() { return number; }

    public void setNumber(int number) { this.number = number; }

    @Basic
    @Column(name = "order_id")
    public int getOrder_id() { return order_id; }

    public void setOrder_id(int order_id) { this.order_id = order_id; }


}

