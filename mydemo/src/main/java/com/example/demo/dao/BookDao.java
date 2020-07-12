package com.example.demo.dao;

import com.example.demo.Entity.Book;
import com.example.demo.constant.BookAndNumber;

import java.util.List;


public interface BookDao {
    Book findOne(int id);

    List<Book> getBooks();

    Book deleteBook(int id);

    Book addBook(String name,String author,String isbn,float price,
                 int inventory, String introduction, String picture);

    Book editBook(int id,String name,String author,String isbn,float price,
                 int inventory, String introduction, String picture);

    List<BookAndNumber> getMostBooks(String begin_time, String end_time);
    List<BookAndNumber> getMostPrices(String begin_time, String end_time);
    List<BookAndNumber> getBookAndNumbers();
}
