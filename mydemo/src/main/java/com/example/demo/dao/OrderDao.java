package com.example.demo.dao;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.Order;
import com.example.demo.constant.BookAndNumber;
import com.example.demo.constant.FetchOrder;
import com.example.demo.constant.SaleBooksWithNum;

import java.util.List;

public interface OrderDao {
    Order findOne(Integer order_item);
    String saveOrder(List<Integer> book_ids,List<Integer> book_nums,float price,
                    String username, String date);
    List<FetchOrder> getOrders(String username);

    List<BookAndNumber> getRecordByUser(String begin_time,String end_time,String username);
    List<BookAndNumber> getAllRecordByUser(String username);
}
