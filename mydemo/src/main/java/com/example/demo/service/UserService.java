package com.example.demo.service;


import com.example.demo.Entity.User;
import com.example.demo.constant.UserAndNumber;

import java.util.List;

public interface UserService {
    User checkUser(String username, String password);
    int saveUser(String username, String password, String email);
    List<User> getUsers();
    User banUser(String username);
    List<UserAndNumber> getMostPrices(String begin_time,String end_time);
    List<UserAndNumber> getMostNumbers(String begin_time,String end_time);
    List<UserAndNumber> getUserAndNumbers();

}
