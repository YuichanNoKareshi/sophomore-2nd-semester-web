package com.example.demo.controller;

import com.example.demo.Entity.Like;
import com.example.demo.constant.PictureAndPrice;
import com.example.demo.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class LikeController {
    @Autowired
    private LikeService likeService;

    @RequestMapping("/saveLike")
    public Like getBook(@RequestParam("username") String username,
                        @RequestParam("book_id") int book_id,
                        @RequestParam("bookName") String book_name,
                        @RequestParam("tot_number") int tot_number,
                        @RequestParam("tot_price") float tot_price)
    {
        return likeService.saveLike(username,book_id,book_name,tot_number,tot_price);
    }

    @RequestMapping("/getLikes")
    public List<Like> getLikes(@RequestParam("username") String username)
    {return likeService.getLikes(username);}

    @RequestMapping("/getPictureAndPrice")
    public List<PictureAndPrice> getPictureAndPrice(@RequestParam("username") String username)
    {return likeService.getPictureAndPrice(username);}

    @RequestMapping("/deleteLike")
    public Like deleteLike(@RequestParam("username") String username,
                                 @RequestParam("book_id") int book_id)
    {return likeService.deleteLike(username,book_id);}
}

