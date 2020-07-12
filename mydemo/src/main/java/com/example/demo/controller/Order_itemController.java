package com.example.demo.controller;


import com.example.demo.Entity.Order;
import com.example.demo.Entity.Order_item;
import com.example.demo.service.Order_itemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class Order_itemController {
    @Autowired
    private Order_itemService order_itemService;


}
