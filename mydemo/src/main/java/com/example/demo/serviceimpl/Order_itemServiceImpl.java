package com.example.demo.serviceimpl;

import com.example.demo.dao.Order_itemDao;
        import com.example.demo.service.Order_itemService;
        import com.example.demo.Entity.Order_item;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Order_itemServiceImpl implements Order_itemService {
    @Autowired
    private Order_itemDao order_itemDao;


}
