package com.example.demo.controller;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.Order;
import com.example.demo.Entity.Order_item;
import com.example.demo.constant.BookAndNumber;
import com.example.demo.constant.FetchOrder;
import com.example.demo.constant.SaleBooksWithNum;
import com.example.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.Fetch;
import java.util.List;

@CrossOrigin
@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @RequestMapping("/saveOrder")
    public String saveOrder(@RequestParam("book_ids") List<Integer> book_ids,
                           @RequestParam("book_nums") List<Integer> book_nums,
                           @RequestParam("price") float price,
                           @RequestParam("username") String username,
                           @RequestParam("date") String date){
        return orderService.saveOrder(book_ids,book_nums,price,username,date);
    }

    @RequestMapping("/getOrders")
    public List<FetchOrder> getOrders(@RequestParam("username") String username)
    {return orderService.getOrders(username);}

    @RequestMapping("/getRecordByUser")
    public List<BookAndNumber> getRecordByUser(@RequestParam("begin_time") String begin_time,
                                               @RequestParam("end_time") String end_time,
                                               @RequestParam("username") String username)
    {return orderService.getRecordByUser(begin_time,end_time,username);}

    @RequestMapping("/getAllRecordByUser")
    public List<BookAndNumber> getAllRecordByUser(@RequestParam("username") String username)
    {return orderService.getAllRecordByUser(username);}
}
