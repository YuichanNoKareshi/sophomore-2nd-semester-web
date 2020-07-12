package com.example.demo.Entity;

import java.io.Serializable;

public class Like_keys implements Serializable {
    private String username;
    private Integer book_id;

    public Like_keys() {}
    public Like_keys(String username,int book_id)
    {
        this.username=username;
        this.book_id=book_id;
    }

    public void setUsername(String username) { this.username = username; }
    public String getUsername() { return username; }

    public void setBook_id(int book_id) { this.book_id=book_id; }
    public int getBook_id() { return book_id; }

    @Override
    public int hashCode() {
        final int PRIME = 31;
        int result = 1;
        result = PRIME * result + ((username == null) ? 0 : username.hashCode());
        result = PRIME * result + ((book_id == null) ? 0 : book_id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj){
        if(this == obj){
            return true;
        }
        if(obj == null){
            return false;
        }
        if(getClass() != obj.getClass()){
            return false;
        }

        final Like_keys other = (Like_keys) obj;
        if(username == null){
            if(other.username != null){
                return false;
            }
        }else if(!username.equals(other.username)){
            return false;
        }

        if(book_id == null){
            if(other.book_id != null){
                return false;
            }
        }else if(!book_id.equals(other.book_id)){
            return false;
        }

        return true;
    }

}
