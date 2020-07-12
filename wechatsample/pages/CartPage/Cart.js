

const app = getApp()
// pages/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    pictureAndPrice:[],
    searchValue:"",
    show: false,
    book: null,
    active:0,
    all_price:0,
    checks:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!app.globalData.userLogged){
      wx.navigateTo({
        url: '../index/index'
      })
    }else{
      that.getData();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getData:function(){
    var that = this;
    var user=wx.getStorageSync('username');
    wx.request({
      url: 'http://localhost:8080/getLikes',
      method: "POST",
      data: {
        username:user,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success(res) {
        
        console.log(res);
        var a_price=0;
        that.setData({
          books: res.data,
        })
        for(var x in that.data.books)
          a_price+=that.data.books[x].tot_price;
        that.setData({
          all_price: a_price*100,
        })
      }
    });

    wx.request({
      url: 'http://localhost:8080/getPictureAndPrice',
      method: "POST",
      data: {
        username:user,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success(res) {
        console.log(res);
        that.setData({
          pictureAndPrice: res.data,
        })
      }
    });
  },

  //点击左下图标
  onClickIcon() {
    wx.showToast({
      title: '客服没钱请！购物车还没做！',
      icon: 'none',
      duration: 2000
    })
  },
  //点击右下按钮
  onClickButton() {
    this.setData({ show:false, buy_show:true });
  },
  //点击底边栏
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },

  onAdd:function(e){
    var that=this;
    var num = e.currentTarget.dataset.num;
    var book_id=e.currentTarget.dataset.book_id;
    num=num+1;
    var new_data=that.data.books;
    var pictureAndPrice=that.data.pictureAndPrice;
    var a_price=that.data.all_price;
    
    for (var i in new_data)
    {
      if (new_data[i].book_id==book_id)
        {
          new_data[i].tot_number++;
          new_data[i].tot_price+=pictureAndPrice[i].price;
          a_price+=pictureAndPrice[i].price*100;
          break;
        }
    }
    that.setData({books:new_data,all_price:a_price});
  },

  onSub:function(e){
    var that=this;
    var num = e.currentTarget.dataset.num;
    var book_id=e.currentTarget.dataset.book_id;
    num=num+1;
    var new_data=that.data.books;
    var pictureAndPrice=that.data.pictureAndPrice;
    var a_price=that.data.all_price;
    
    for (var i in new_data)
    {
      if (new_data[i].book_id==book_id)
        {
          if(new_data[i].tot_number==0) return;
          new_data[i].tot_number--;
          new_data[i].tot_price-=pictureAndPrice[i].price;
          a_price-=pictureAndPrice[i].price*100;
          break;
        }
    }
    that.setData({books:new_data,all_price:a_price});
  },

  onSubmit:function(){
    var that=this;
    var user=wx.getStorageSync('username');
    var book_ids=new Array();
    var book_nums=new Array();
    for (var i in that.data.books)
    {
      book_ids[i]=that.data.books[i].book_id;
      book_nums[i]=that.data.books[i].tot_number;
    }
    let d=new Date();
    let year=d.getFullYear();
    let month=d.getMonth()+1;
    if (month < 10) month='0'+month;
    let day=d.getDate();
    if (day < 10) day='0'+day;
    let date=year+'-'+month+'-'+day;

    wx.request({
      url: 'http://localhost:8080/saveOrder',
      method: "POST",
      data: {
        username: user,
        book_ids: book_ids,
        book_nums: book_nums,
        price: that.data.all_price/100,
        date: date
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success(res) {
        that.getData();
        wx.showToast({
          title: '已购买',
          icon: 'none',
          duration: 2000
        })
      }
    });
  }
  
  
})