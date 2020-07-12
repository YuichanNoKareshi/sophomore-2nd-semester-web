package com.example.demo.daoimpl;

import com.example.demo.Entity.Order;
import com.example.demo.dao.Order_itemDao;
import com.example.demo.Entity.Order_item;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.Order_itemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class Order_itemDaoImpl implements Order_itemDao {
    @Autowired
    private Order_itemRepository order_itemRepository;
    @Autowired
    private OrderRepository orderRepository;


}
