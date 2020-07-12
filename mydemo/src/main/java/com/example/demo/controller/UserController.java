package com.example.demo.controller;

import com.example.demo.Entity.User;
import com.example.demo.constant.BookAndNumber;
import com.example.demo.constant.UserAndNumber;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/checkUser")
    public User checkUser(@RequestParam("username") String username, @RequestParam("password") String password){
        return userService.checkUser(username, password);
    }

    @RequestMapping("/saveUser")
    public int saveUser(@RequestParam("username") String username,
                        @RequestParam("password") String password,
                        @RequestParam("email") String email){
        return userService.saveUser(username, password, email);
    }

    @RequestMapping("/getUsers")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @RequestMapping("/banUser")
    public User banUser(@RequestParam("username") String username){
        return userService.banUser(username);
    }

    @RequestMapping("/UserMostPrices")
    public List<UserAndNumber> getMostPrices(@RequestParam("begin_time") String begin_time,
                                                 @RequestParam("end_time") String end_time)
    {return userService.getMostPrices(begin_time,end_time);}

    @RequestMapping("/UserMostNumbers")
    public List<UserAndNumber> getMostNumbers(@RequestParam("begin_time") String begin_time,
                                            @RequestParam("end_time") String end_time)
    {return userService.getMostNumbers(begin_time,end_time);}

    @RequestMapping("/getUserAndNumbers")
    public List<UserAndNumber> getUserAndNumbers()
    {return userService.getUserAndNumbers();}


}
