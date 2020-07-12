package com.example.demo.daoimpl;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.BookMore;
import com.example.demo.Entity.Like;
import com.example.demo.constant.PictureAndPrice;
import com.example.demo.dao.LikeDao;
import com.example.demo.repository.BookMoreRepository;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;


@Repository
public class LikeDaoImpl implements LikeDao {

    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookMoreRepository bookMoreRepository;

    @Override
    public Like saveLike(String username,int book_id,String book_name,int tot_number,float tot_price)
    {
        //先get
        Like oldLike = likeRepository.getLike(username,book_id);
        if (oldLike != null)//如果原来购物车里就有这本书
        {
            int number=oldLike.getTot_number()+tot_number;
            float price=oldLike.getTot_price()+tot_price;
            oldLike.setTot_number(number);
            oldLike.setTot_price(price);
            likeRepository.save(oldLike);

            return oldLike;
        }

        Like newLike = new Like();

        newLike.setUsername(username);
        newLike.setBook_id(book_id);
        newLike.setBook_name(book_name);
        newLike.setTot_number(tot_number);
        newLike.setTot_price(tot_price);

        likeRepository.save(newLike);//实现数据更新

        return newLike;
    }

    @Override
    public List<Like> getLikes(String username)
    {
        List<Like> likes = likeRepository.getLikes(username);
        for (Like l : likes)
        {
            Book book = bookRepository.getOne(l.getBook_id());
            if (book == null) return null;
            int invent=0;
            if (book.getIs_delete()==0)
                invent = book.getInventory();
            l.setInventory(invent);//获得每个购物车元素的库存
        }
        return likes;
    }

    @Override
    public List<PictureAndPrice> getPictureAndPrice(String username)
    {
        List<Like> likes = likeRepository.getLikes(username);
        List<PictureAndPrice> pictures=new ArrayList<>();
        for (Like l : likes)
        {
            Book book =bookRepository.getOne(l.getBook_id());
            BookMore bookMore = bookMoreRepository.findBookMoreById(l.getBook_id());
            if (bookMore == null || book == null) return null;

            if (book.getIs_delete()==0)
            {
                PictureAndPrice picture=new PictureAndPrice(bookMore.getPicture(),book.getPrice());
                pictures.add(picture);
            }
        }

        return pictures;
    }

    @Override
    public Like deleteLike(String username,int book_id)
    {
        Like like = likeRepository.getLike(username,book_id);
        if (like != null) likeRepository.delete(like);
        return like;
    }

}

