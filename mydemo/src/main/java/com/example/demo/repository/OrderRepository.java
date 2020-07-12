package com.example.demo.repository;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer>{
    @Query(value = "from Order where username=:username")
    List<Order> getOrders(@Param("username") String username);

    @Query("select o from Order o where o.date >=: begin_time and o.date <=: end_time")
    List<Order> getAimOrder(@Param("begin_time")String begin_time,
                        @Param("end_time")String end_time);

    @Query("select o from Order o")
    List<Order> getAllOrders();
}
