package com.example.demo.daoimpl;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.Order;
import com.example.demo.Entity.Order_item;
import com.example.demo.constant.BookAndNumber;
import com.example.demo.constant.UserAndNumber;
import com.example.demo.dao.UserDao;
import com.example.demo.Entity.User;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.Order_itemRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    Order_itemRepository order_itemRepository;

    @Override
    public User checkUser(String username, String password){

        return userRepository.checkUser(username,password);
    }

    @Override
    public int saveUser(String username, String password, String email){
        User u1=userRepository.checkUsername(username);
        if (u1 != null) return 1;
        User u2=userRepository.checkEmail(email);
        if (u2 != null) return 2;

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setEmail(email);
        newUser.setAdministrator(0);
        newUser.setBan(0);
        userRepository.save(newUser);
        return 0;
    }

    @Override
    public List<User> getUsers()
    {
        return userRepository.getUsers();
    }

    @Override
    public User banUser(String username){
        User user=userRepository.checkUsername(username);
        int newBan = (user.getBan()==1) ? 0 : 1 ;//设为相反的ban
        user.setBan(newBan);
        userRepository.save(user);
        return user;
    }

    @Override
    public List<UserAndNumber> getMostPrices(String begin_time,String end_time)
    {
        List<String> usernames=new ArrayList<>();
        List<UserAndNumber> userAndNumbers=new ArrayList<>();//既有username又有tot_number
        List<Order> orders = orderRepository.getAllOrders();
        orders.removeIf(temp -> temp.getDate().compareTo(begin_time) < 0
                || temp.getDate().compareTo(end_time) > 0);
        if (orders.isEmpty()) return userAndNumbers;

        for (Order o: orders)
        {
            String username =o.getUsername();
            List<Order_item> order_items=order_itemRepository.getOrder_items(o.getOrder_id());
            int number=order_items.size();
            UserAndNumber newOne=new UserAndNumber(username,number, o.getTot_price());
            int index=usernames.indexOf(newOne.getUsername());//看这个book_id是否已经存在
            if (index==-1)//如果不存在
            {
                userAndNumbers.add(newOne);
                usernames.add(newOne.getUsername());
            }
            else//更新书的number
            {
                UserAndNumber oldOne=userAndNumbers.get(index);
                newOne.setNumber(newOne.getNumber()+oldOne.getNumber());
                newOne.setTot_price(newOne.getTot_price()+oldOne.getTot_price());
                userAndNumbers.set(index, newOne);
            }
        }
        userAndNumbers.sort(Comparator.comparingDouble(UserAndNumber::getTot_price).reversed());//大的在前

        return userAndNumbers;
    }

    @Override
    public List<UserAndNumber> getMostNumbers(String begin_time,String end_time)
    {
        List<String> usernames=new ArrayList<>();
        List<UserAndNumber> userAndNumbers=new ArrayList<>();//既有username又有tot_number
        List<Order> orders = orderRepository.getAllOrders();
        orders.removeIf(temp -> temp.getDate().compareTo(begin_time) < 0
                || temp.getDate().compareTo(end_time) > 0);
        if (orders.isEmpty()) return userAndNumbers;

        for (Order o: orders)
        {
            String username =o.getUsername();
            List<Order_item> order_items=order_itemRepository.getOrder_items(o.getOrder_id());
            int number=order_items.size();
            UserAndNumber newOne=new UserAndNumber(username,number, o.getTot_price());
            int index=usernames.indexOf(newOne.getUsername());//看这个book_id是否已经存在
            if (index==-1)//如果不存在
            {
                userAndNumbers.add(newOne);
                usernames.add(newOne.getUsername());
            }
            else//更新书的number
            {
                UserAndNumber oldOne=userAndNumbers.get(index);
                newOne.setNumber(newOne.getNumber()+oldOne.getNumber());
                newOne.setTot_price(newOne.getTot_price()+oldOne.getTot_price());
                userAndNumbers.set(index, newOne);
            }
        }
        userAndNumbers.sort(Comparator.comparingInt(UserAndNumber::getNumber).reversed());//大的在前

        return userAndNumbers;
    }

    @Override
    public List<UserAndNumber> getUserAndNumbers()
    {
        List<String> usernames=new ArrayList<>();
        List<UserAndNumber> userAndNumbers=new ArrayList<>();//既有username又有tot_number
        List<Order> orders = orderRepository.getAllOrders();
        if (orders.isEmpty()) return userAndNumbers;

        for (Order o: orders)
        {
            String username =o.getUsername();
            List<Order_item> order_items=order_itemRepository.getOrder_items(o.getOrder_id());
            int number=order_items.size();
            UserAndNumber newOne=new UserAndNumber(username,number, o.getTot_price());
            int index=usernames.indexOf(newOne.getUsername());//看这个book_id是否已经存在
            if (index==-1)//如果不存在
            {
                userAndNumbers.add(newOne);
                usernames.add(newOne.getUsername());
            }
            else//更新书的number
            {
                UserAndNumber oldOne=userAndNumbers.get(index);
                newOne.setNumber(newOne.getNumber()+oldOne.getNumber());
                newOne.setTot_price(newOne.getTot_price()+oldOne.getTot_price());
                userAndNumbers.set(index, newOne);
            }
        }

        return userAndNumbers;
    }
}
