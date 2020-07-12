package com.example.demo.controller;

import com.example.demo.Entity.Book;
import com.example.demo.constant.BookAndNumber;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class BookController {
    @Autowired
    private BookService bookService;

    @RequestMapping("/getBooks")
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestParam("id") int id){ return bookService.findBookById(id); }

    @RequestMapping("/deleteBook")
    public Book deleteBook(@RequestParam("id") int id){ return bookService.deleteBook(id); }

    @RequestMapping("/addBook")
    public Book addBook(@RequestParam("name") String name,
                        @RequestParam("author") String author,
                        @RequestParam("isbn") String isbn,
                        @RequestParam("price") float price,
                        @RequestParam("inventory") int inventory,
                        @RequestParam("introduction") String introduction,
                        @RequestParam("picture") String picture
                        )
    { return bookService.addBook(name,author,isbn,price,inventory,introduction,picture); }

    @RequestMapping("/editBook")
    public Book addBook(@RequestParam("id") int id,
                        @RequestParam("name") String name,
                        @RequestParam("author") String author,
                        @RequestParam("isbn") String isbn,
                        @RequestParam("price") float price,
                        @RequestParam("inventory") int inventory,
                        @RequestParam("introduction") String introduction,
                        @RequestParam("picture") String picture
    )
    { return bookService.editBook(id,name,author,isbn,price,inventory,introduction,picture); }

    @RequestMapping("/BookMostNumbers")
    public List<BookAndNumber> getMostBooks(@RequestParam("begin_time") String begin_time,
                                            @RequestParam("end_time") String end_time)
    { return bookService.getMostBooks(begin_time,end_time);}

    @RequestMapping("/BookMostPrices")
    public List<BookAndNumber> getMostPrices(@RequestParam("begin_time") String begin_time,
                                             @RequestParam("end_time") String end_time)
    {return bookService.getMostPrices(begin_time,end_time);}

    @RequestMapping("/getBookAndNumbers")
    public List<BookAndNumber> getBookAndNumbers()
    {return bookService.getBookAndNumbers();}

}

