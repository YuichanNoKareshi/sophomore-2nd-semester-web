package com.example.demo.repository;

import com.example.demo.Entity.Order;
import com.example.demo.Entity.Order_item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Order_itemRepository extends JpaRepository<Order_item, Integer>{
    @Query(value = "from Order_item where order_id=:order_id")
    List<Order_item> getOrder_items(@Param("order_id")int order_id);

}
