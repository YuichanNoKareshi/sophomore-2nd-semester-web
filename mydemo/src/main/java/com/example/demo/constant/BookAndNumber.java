package com.example.demo.constant;

public class BookAndNumber {

        private int book_id;
        private String name;
        private float price;
        private int number;
        private float tot_price;

        public void setBook_id(int book_id) {this.book_id=book_id;}
        public int getBook_id() {return this.book_id;}
        public void setName(String name) {this.name=name;}
        public String getName() {return this.name;}
        public void setPrice(int price) {this.price=price;}
        public float getPrice() {return this.price;}
        public void setNumber(int number) {this.number=number;}
        public int getNumber() {return this.number;}
        public void setTot_price(float tot_price) {this.tot_price=tot_price;}
        public float getTot_price() {return this.tot_price;}


        public BookAndNumber(int book_id,String name,float price ,int number, float tot_price)
        {
            this.book_id=book_id;
            this.name=name;
            this.price=price;
            this.number=number;
            this.tot_price=tot_price;
        }

}
