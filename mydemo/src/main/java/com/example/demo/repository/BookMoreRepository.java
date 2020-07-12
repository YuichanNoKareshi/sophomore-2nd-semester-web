package com.example.demo.repository;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.BookMore;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

public interface BookMoreRepository extends MongoRepository<BookMore, Integer>{
    BookMore findBookMoreById(@Param("id") int id);
}
