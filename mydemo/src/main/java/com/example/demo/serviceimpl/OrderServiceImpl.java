package com.example.demo.serviceimpl;

import com.example.demo.Entity.Book;
import com.example.demo.constant.BookAndNumber;
import com.example.demo.constant.FetchOrder;
import com.example.demo.constant.SaleBooksWithNum;
import com.example.demo.dao.OrderDao;
        import com.example.demo.service.OrderService;
        import com.example.demo.Entity.Order;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDao orderDao;

    @Override
    public Order findOrdersById(Integer order_item){
        return orderDao.findOne(order_item);
    }

    @Override
    public String saveOrder(List<Integer> book_ids,List<Integer> book_nums, float price,
                           String username, String date)
    {
        return orderDao.saveOrder(book_ids,book_nums,price,username,date);
    }

    @Override
    public List<FetchOrder> getOrders(String username)
    {
        return orderDao.getOrders(username);
    }


    @Override
    public List<BookAndNumber> getRecordByUser(String begin_time,String end_time,String username)
    {return orderDao.getRecordByUser(begin_time,end_time,username);}

    @Override
    public List<BookAndNumber> getAllRecordByUser(String username)
    {return orderDao.getAllRecordByUser(username);}
}
