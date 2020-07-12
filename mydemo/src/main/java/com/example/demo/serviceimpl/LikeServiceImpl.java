package com.example.demo.serviceimpl;

import com.example.demo.Entity.Like;
import com.example.demo.constant.PictureAndPrice;
import com.example.demo.dao.LikeDao;
import com.example.demo.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImpl implements LikeService {
    @Autowired
    private LikeDao likeDao;

    @Override
    public Like saveLike(String username,int book_id,String book_name,int tot_number,float tot_price)
    {
        return likeDao.saveLike(username,book_id,book_name,tot_number,tot_price);
    }

    @Override
    public List<Like> getLikes(String username)
    {
        return likeDao.getLikes(username);
    }

    @Override
    public List<PictureAndPrice> getPictureAndPrice(String username)
    { return likeDao.getPictureAndPrice(username); }

    @Override
    public Like deleteLike(String username,int book_id)
    {
        return likeDao.deleteLike(username,book_id);
    }


}
