package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;


import javax.persistence.*;


@Data
@Entity
@Table(name = "users")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "username")
public class User {
    private String username;
    private String password;
    private String email;
    private int administrator;
    private int ban;

    @Id
    @Column(name = "username")
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    @Basic
    @Column(name = "password")
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    @Basic
    @Column(name = "email")
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    @Basic
    @Column(name = "administrator")
    public int getAdministrator() { return administrator; }
    public void setAdministrator(int administrator) { this.administrator = administrator; }

    @Basic
    @Column(name = "ban")
    public int getBan() { return ban; }
    public void setBan(int ban) { this.ban = ban; }


}
