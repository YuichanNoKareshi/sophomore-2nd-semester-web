package com.example.demo.service;


import com.example.demo.Entity.Like;
import com.example.demo.constant.PictureAndPrice;

import java.util.List;


public interface LikeService {
    Like saveLike(String username,int book_id,String book_name,int tot_number,float tot_price);
    List<Like> getLikes(String username);
    List<PictureAndPrice> getPictureAndPrice(String username);
    Like deleteLike(String username,int book_id);
}
