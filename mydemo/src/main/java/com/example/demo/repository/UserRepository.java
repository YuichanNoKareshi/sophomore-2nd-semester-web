package com.example.demo.repository;

import com.example.demo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,String> {
    @Query(value = "from User where username = :username and password = :password")
    User checkUser(@Param("username") String username, @Param("password") String password);

    @Query(value = "from User where username = :username")
    User checkUsername(@Param("username") String username);

    @Query(value = "from User where email = :email")
    User checkEmail(@Param("email") String email);

    @Query(value = "select u from User u")
    List<User> getUsers();
}
