package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import javax.persistence.*;
import java.util.List;


@Data
@Entity
@Table(name = "orders")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "order_id")
public class Order {
    private String username;
    private int order_id;
    private float tot_price;
    private String date;

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "order_id")
    public int getOrder_id() { return order_id; }
    public void setOrder_id(int order_id) { this.order_id = order_id; }

    @Basic
    @Column(name = "username")
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) { this.username = username; }

    @Basic
    @Column(name = "tot_price")
    public float getTot_price() { return tot_price; }
    public void setTot_price(float tot_price) { this.tot_price = tot_price; }

    @Basic
    @Column(name = "date")
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}
