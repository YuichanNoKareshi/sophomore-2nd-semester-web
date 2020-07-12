package com.example.demo.serviceimpl;

import com.example.demo.constant.BookAndNumber;
import com.example.demo.dao.BookDao;
import com.example.demo.service.BookService;
import com.example.demo.Entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    @Override
    public Book findBookById(int id){ return bookDao.findOne(id); }

    @Override
    public List<Book> getBooks() {
        return bookDao.getBooks();
    }

    @Override
    public Book deleteBook(int id){ return bookDao.deleteBook(id); }

    @Override
    public Book addBook(String name,String author,String isbn,float price,
                 int inventory, String introduction, String picture)
    {
        return bookDao.addBook(name, author, isbn, price, inventory, introduction, picture);
    }

    @Override
    public Book editBook(int id, String name,String author,String isbn,float price,
                        int inventory, String introduction, String picture)
    {
        return bookDao.editBook(id, name, author, isbn, price, inventory, introduction, picture);
    }

    @Override
    public List<BookAndNumber> getMostBooks(String begin_time, String end_time)
    {
        return bookDao.getMostBooks(begin_time,end_time);
    }

    @Override
    public List<BookAndNumber> getMostPrices(String begin_time, String end_time)
    {
        return bookDao.getMostPrices(begin_time,end_time);
    }

    @Override
    public List<BookAndNumber> getBookAndNumbers()
    {
        return bookDao.getBookAndNumbers();
    }
}
