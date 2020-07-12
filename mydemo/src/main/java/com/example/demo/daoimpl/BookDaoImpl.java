package com.example.demo.daoimpl;

import com.example.demo.Entity.*;
import com.example.demo.constant.BookAndNumber;
import com.example.demo.dao.BookDao;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.BookMoreRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.Order_itemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookMoreRepository bookmoreRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private Order_itemRepository order_itemRepository;

    @Override
    public Book findOne(int id) {
        Book book = bookRepository.getOne(id);
        Optional<BookMore> bookMore = bookmoreRepository.findById(id);
        if (bookMore.isPresent()){
            book.setBookmore(bookMore.get());
        }
        else{
            book.setBookmore(null);
            System.out.println("It's Null");
        }
        return book;
    }

    @Override
    public List<Book> getBooks() {
        List<Book> books = bookRepository.getBooks();
        for (Book b : books)
        {
            Optional<BookMore> bookMore = bookmoreRepository.findById(b.getId());
            if (bookMore.isPresent()){
                b.setBookmore(bookMore.get());
            }
            else{
                b.setBookmore(null);
                System.out.println("It's Null");
            }
        }

        return books;
    }

    @Override
    public Book deleteBook(int id) {
        Book book = bookRepository.getOne(id);
//        if (book != null) bookRepository.delete(book);
        if (book != null) {
            book.setIs_delete(1);
            bookRepository.save(book);
        }
        return book;
    }

    @Override
    public Book addBook(String name,String author,String isbn,float price,
                        int inventory, String introduction, String picture)
    {
        Book book = new Book();
        book.setName(name);
        book.setAuthor(author);
        book.setIsbn(isbn);
        book.setPrice(price);
        book.setInventory(inventory);
        book.setInventory(0);
        bookRepository.save(book);

        BookMore bookMore = new BookMore();
        bookMore.setId(book.getId());
        bookMore.setIntroduction(introduction);
        bookMore.setPicture(picture);

        book.setBookmore(bookMore);

        bookmoreRepository.save(bookMore);
        bookRepository.save(book);

        return book;
    }

    @Override
    public Book editBook(int id,String name,String author,String isbn,float price,
                        int inventory, String introduction, String picture)
    {
        Book book = bookRepository.getOne(id);
        book.setName(name);
        book.setAuthor(author);
        book.setIsbn(isbn);
        book.setPrice(price);
        book.setInventory(inventory);

        BookMore bookMore = bookmoreRepository.findBookMoreById(id);
        bookMore.setIntroduction(introduction);
        bookMore.setPicture(picture);

        book.setBookmore(bookMore);

        bookmoreRepository.save(bookMore);
        bookRepository.save(book);

        return book;
    }

    @Override
    public List<BookAndNumber> getMostBooks(String begin_time, String end_time)
    {
        List<Integer> book_ids=new ArrayList<>();
        List<BookAndNumber> bookAndNumbers=new ArrayList<>();//既有book_id又有tot_number
        List<Order> orders = orderRepository.getAllOrders();
        orders.removeIf(temp -> temp.getDate().compareTo(begin_time) < 0 || temp.getDate().compareTo(end_time) > 0);
        if (orders.isEmpty()) return bookAndNumbers;

        for (Order o: orders)
        {
            List<Order_item> order_items=order_itemRepository.getOrder_items(o.getOrder_id());//得到items
            for (Order_item item : order_items)//对这个order中的每个item
            {
                Book book =bookRepository.getOne(item.getBook_id());
                float tot_price=item.getNumber()*book.getPrice();
                BookAndNumber newOne=new BookAndNumber(item.getBook_id(),book.getName(),
                        book.getPrice(),item.getNumber(),tot_price);
                int index=book_ids.indexOf(newOne.getBook_id());//看这个book_id是否已经存在
                if (index==-1)//如果不存在
                {
                    bookAndNumbers.add(newOne);
                    book_ids.add(newOne.getBook_id());
                }
                else//更新书的number
                {
                    BookAndNumber oldOne=bookAndNumbers.get(index);
                    newOne.setNumber(newOne.getNumber()+oldOne.getNumber());
                    newOne.setTot_price(newOne.getTot_price()+oldOne.getTot_price());
                    bookAndNumbers.set(index, newOne);
                }
            }
        }
        bookAndNumbers.sort(Comparator.comparingInt(BookAndNumber::getNumber).reversed());//大的在前

        return bookAndNumbers;
    }

    @Override
    public List<BookAndNumber> getMostPrices(String begin_time, String end_time)
    {
        List<Integer> book_ids=new ArrayList<>();
        List<BookAndNumber> bookAndPrices=new ArrayList<>();//既有book_id又有tot_number
        List<Order> orders = orderRepository.getAllOrders();
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
        bookAndPrices.sort(Comparator.comparingDouble(BookAndNumber::getTot_price).reversed());//大的在前

        return bookAndPrices;
    }

    @Override
    public List<BookAndNumber> getBookAndNumbers()
    {
        List<Integer> book_ids=new ArrayList<>();
        List<BookAndNumber> bookAndPrices=new ArrayList<>();//既有book_id又有tot_number
        List<Order> orders = orderRepository.getAllOrders();
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

