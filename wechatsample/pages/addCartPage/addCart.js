// pages/addCartPage/addCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id: 1,
      bookName: 123,
      author:'',
      price: 789,
      more: 456,
      tot_number: 0,
      image:'',
      inventory: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.getData(options.id);
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

  getData:function(index_id){
    var that=this;
    wx.request({
      url: 'http://localhost:8080/getBook',
      method: "POST",
      data: {
        id: index_id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success(res) {
        console.log(res);
        that.setData({
          id: index_id,
          bookName: res.data.name,
          author:res.data.author,
          price:res.data.price,
          more:res.data.bookmore.introduction,
          image:res.data.bookmore.picture,
          inventory:res.data.inventory,
        })
      }
    });
  },

  onAdd:function(){
    var that=this;
    var num=that.data.tot_number;
    num = num + 1;
    that.setData({tot_number:num});
  },

  onSub:function(){
    var that=this;
    var num=that.data.tot_number;
    num = (num==0) ? 0 : (num - 1);
    that.setData({tot_number:num});
  },

  onConfirm:function(){
    var that=this;
    var tot_price=that.data.price*that.data.tot_number;
    var user=wx.getStorageSync('username');
    wx.request({
      url: 'http://localhost:8080/saveLike',
      method: "POST",
      data: {
        username: user,
        book_id: that.data.id,
        bookName: that.data.bookName,
        tot_number: that.data.tot_number,
        tot_price: tot_price
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success(res) {
        that.setData({tot_number: 0});
        wx.showToast({
          title: '已加入购物车',
          icon: 'none',
          duration: 2000
        })
      }
    });
  },

  onBuy:function(){
    var that=this;
    var user=wx.getStorageSync('username');
    var book_ids=new Array();
    var book_nums=new Array();
    var all_price=that.data.price*that.data.tot_number;
    book_ids[0]=that.data.id;
    book_nums[0]=that.data.tot_number;
  
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
        price: all_price,
        date: date
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success(res) {
        that.getData(that.data.id);
        wx.showToast({
          title: '已购买',
          icon: 'none',
          duration: 2000
        })
      }
    });
  }
})