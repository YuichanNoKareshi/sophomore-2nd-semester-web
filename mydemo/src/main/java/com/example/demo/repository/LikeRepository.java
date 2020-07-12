package com.example.demo.repository;

import com.example.demo.Entity.Like;
import com.example.demo.Entity.Like_keys;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface LikeRepository extends JpaRepository<Like, Like_keys>{
    @Query(value = "from Like where username=:username and book_id=:book_id")
    Like getLike(@Param("username") String username,@Param("book_id") int book_id);

    @Query(value = "from Like where username=:username")
    List<Like> getLikes(@Param("username") String username);
}
