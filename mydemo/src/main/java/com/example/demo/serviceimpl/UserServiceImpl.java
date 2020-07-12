package com.example.demo.serviceimpl;

import com.example.demo.constant.UserAndNumber;
import com.example.demo.dao.UserDao;
import com.example.demo.Entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public User checkUser(String username, String password){
        return userDao.checkUser(username,password);
    }

    @Override
    public int saveUser(String username, String password, String email)
    {
        return userDao.saveUser(username,password,email);
    }

    @Override
    public List<User> getUsers()
    {
        return userDao.getUsers();
    }

    @Override
    public User banUser(String username)
    {
        return userDao.banUser(username);
    }

    @Override
    public List<UserAndNumber> getMostPrices(String begin_time, String end_time)
    {
        return userDao.getMostPrices(begin_time,end_time);
    }

    @Override
    public List<UserAndNumber> getMostNumbers(String begin_time, String end_time)
    {
        return userDao.getMostNumbers(begin_time,end_time);
    }

    @Override
    public List<UserAndNumber> getUserAndNumbers()
    {
        return userDao.getUserAndNumbers();
    }
}
