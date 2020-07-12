package com.example.demo.repository;

import com.example.demo.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface BookRepository extends JpaRepository<Book, Integer>{
    @Query("select b from Book b where b.is_delete=0")
    List<Book> getBooks();

    @Query(value = "from Book where id=:id")
    Book getOne(@Param("id") int id);

    @Query("select b from Book b ")
    List<Book> getAllBooks();

}
