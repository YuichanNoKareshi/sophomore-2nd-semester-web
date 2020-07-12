package com.example.demo.service;


import com.example.demo.Entity.Book;
import com.example.demo.Entity.Order;
import com.example.demo.constant.BookAndNumber;
import com.example.demo.constant.FetchOrder;
import com.example.demo.constant.SaleBooksWithNum;
import org.springframework.data.relational.core.sql.In;

import java.util.List;

public interface OrderService {
    Order findOrdersById(Integer order_item);
    List<FetchOrder> getOrders(String username);
    String saveOrder(List<Integer> book_ids,List<Integer> book_nums, float price,
                    String username, String date);

    List<BookAndNumber> getRecordByUser(String begin_time,String end_time,String username);
    List<BookAndNumber> getAllRecordByUser(String username);
}
