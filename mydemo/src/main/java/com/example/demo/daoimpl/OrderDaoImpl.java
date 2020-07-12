package com.example.demo.daoimpl;

import com.example.demo.Entity.*;
import com.example.demo.constant.*;
import com.example.demo.dao.OrderDao;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import java.util.*;

@Repository
public class OrderDaoImpl implements OrderDao {

    @Autowired
    private Order_itemRepository order_itemRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookMoreRepository bookMoreRepository;
    @Autowired
    LikeRepository likeRepository;

    @Override
    public String saveOrder(List<Integer> book_ids,List<Integer> book_nums, float price,
                           String username, String date)
    {
        StringBuffer result=new StringBuffer("");
        int canSave=1;
        for (int index=0;index<book_ids.size();index++) {
            Book book = bookRepository.getOne(book_ids.get(index));
            if (book.getIs_delete()==1)
            {
                canSave=0;
                result.append("《");
                result.append(book.getName());//返回超出库存的书
                result.append("》（inventory: 0）");
            }
            else if (book.getInventory() < book_nums.get(index))
            {
                canSave=0;
                result.append("《");
                result.append(book.getName());//返回超出库存的书
                result.append("》（inventory: ");
                result.append(book.getInventory());
                result.append("）");
            }

        }
        if (canSave==0) return result.toString();

        Order order = new Order();

        order.setUsername(username);
        order.setTot_price(price);
        order.setDate(date);
        orderRepository.save(order);//实现Order更新

        for (int index=0;index<book_ids.size();index++) {
            if (book_nums.get(index)==0) continue;;

            Order_item order_item = new Order_item();
            order_item.setBook_id(book_ids.get(index));
            order_item.setNumber(book_nums.get(index));
            order_item.setOrder_id(order.getOrder_id());
            order_itemRepository.save(order_item);//实现Order_item更新

            Book book = bookRepository.getOne(book_ids.get(index));
            int invent = book.getInventory();
            invent = invent - book_nums.get(index);
            book.setInventory(invent);
            bookRepository.save(book);//实现Book更新


            Like oldLike = likeRepository.getLike(username,book_ids.get(index));
            likeRepository.delete(oldLike);//实现Like更新
        }

        return "";
    }

    @Override
    public List<FetchOrder> getOrders(String username)
    {
        List<Order> orders = orderRepository.getOrders(username);
        List<FetchOrder> fetchOrders= new LinkedList<>();
        for (Order o : orders)
        {
            FetchOrder fetchOrder = new FetchOrder();
            fetchOrder.setOrder(o);//fetchOrder分为order部分和FItem部分，先设置order部分

            List<FetchItem> FItems = new LinkedList<>();
            List<Order_item> myItems = order_itemRepository.getOrder_items(o.getOrder_id());
            for (Order_item i : myItems)
            {
                Book book = bookRepository.getOne(i.getBook_id());
                BookMore bookMore = bookMoreRepository.findBookMoreById(i.getBook_id());

                FetchItem FItem = new FetchItem();//FItem分为book部分和书籍数两部分
                FItem.setNumber(i.getNumber());
                FItem.setName(book.getName());
                FItem.setPicture(bookMore.getPicture());
                FItem.setPrices(book.getPrice()*i.getNumber());

                FItems.add(FItem);
            }
            fetchOrder.setItems(FItems);//设置fetchOrder的item部分

            fetchOrders.add(fetchOrder);
        }

        return fetchOrders;
    }

    @Override
    public Order findOne(Integer order_item) {
        return orderRepository.getOne(order_item);
    }



    @Override
    public List<BookAndNumber> getRecordByUser(String begin_time,String end_time,String username)
    {
        List<Integer> book_ids=new ArrayList<>();
        List<BookAndNumber> bookAndPrices=new ArrayList<>();//既有book_id又有tot_number
        List<Order> orders = orderRepository.getOrders(username);
        orders.removeIf(temp -> temp.getDate().compareTo(begin_time) < 0 || temp.getDate().compareTo(end_time) > 0);
        if (orders.isEmpty()) return bookAndPrices;

        for (Order o: orders)
        {
            List<Order_item> order_items=order_itemRepository.getOrder_items(o.getOrder_id());//得到items
            for (Order_item item : order_items)//对这个order中的每个item
            {
                Book book=bookRepository.getOne(item.getBook_id());
                float tot_price=item.getNumber()*book.getPrice();
                BookAndNumber newOne=new BookAndNumber(book.getId(),book.getName(),
                        book.getPrice(),item.getNumber(),tot_price);
                int index=book_ids.indexOf(newOne.getBook_id());//看这个book_id是否已经存在
                if (index==-1)//如果不存在
                {
                    bookAndPrices.add(newOne);
                    book_ids.add(newOne.getBook_id());
                }
                else//更新书的number
                {
                    BookAndNumber oldOne=bookAndPrices.get(index);
                    newOne.setNumber(newOne.getNumber()+oldOne.getNumber());
                    newOne.setTot_price(newOne.getTot_price()+oldOne.getTot_price());
                    bookAndPrices.set(index, newOne);
                }
            }
        }

        return bookAndPrices;
    }

    @Override
    public List<BookAndNumber> getAllRecordByUser(String username)
    {
        List<Integer> book_ids=new ArrayList<>();
        List<BookAndNumber> bookAndPrices=new ArrayList<>();//既有book_id又有tot_number
        List<Order> orders = orderRepository.getOrders(username);
        if (orders.isEmpty()) return bookAndPrices;

        for (Order o: orders)
        {
            List<Order_item> order_items=order_itemRepository.getOrder_items(o.getOrder_id());//得到items
            for (Order_item item : order_items)//对这个order中的每个item
            {
                Book book=bookRepository.getOne(item.getBook_id());
                float tot_price=item.getNumber()*book.getPrice();
                BookAndNumber newOne=new BookAndNumber(book.getId(),book.getName(),
                        book.getPrice(),item.getNumber(),tot_price);
                int index=book_ids.indexOf(newOne.getBook_id());//看这个book_id是否已经存在
                if (index==-1)//如果不存在
                {
                    bookAndPrices.add(newOne);
                    book_ids.add(newOne.getBook_id());
                }
                else//更新书的number
                {
                    BookAndNumber oldOne=bookAndPrices.get(index);
                    newOne.setNumber(newOne.getNumber()+oldOne.getNumber());
                    newOne.setTot_price(newOne.getTot_price()+oldOne.getTot_price());
                    bookAndPrices.set(index, newOne);
                }
            }
        }

        return bookAndPrices;
    }
}

