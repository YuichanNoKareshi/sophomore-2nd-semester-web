package com.example.demo.Entity;

import com.example.demo.dao.BookDao;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;


@Document(collection = "books")
public class BookMore {
    @Id
    private int id;

    private String introduction;
    private String picture;

    public BookMore(int id,String introduction,String picture) {
        this.id=id;
        this.introduction = introduction;
        this.picture = picture;
    }

    public BookMore ()
    {
        this.id =0;
        this.introduction="";
        this.picture="";
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getIntroduction() { return introduction; }
    public void setIntroduction(String introduction) { this.introduction = introduction; }

    public String getPicture() { return picture; }
    public void setPicture(String picture) { this.picture = picture; }
}
