const app = getApp()
// pages/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    carouselImgUrls: [
      "../../assets/book1.jpg",
      "../../assets/book2.jpg",
      "../../assets/book3.jpg",
      "../../assets/book4.jpg",
      "../../assets/book5.jpg",
    ],
    searchValue:"",
    show: false,
    book: null,
    active:0,
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
      wx.request({
        url: 'http://localhost:8080/getBooks',
        method: "POST",
        data: {
          11:11
        },
        header: {
          'content-type': 'application/json', // 默认值
          'cookie': wx.getStorageSync("sessionid") //cookie
        },
        success(res) {
          console.log(res);
          that.setData({
            books: res.data
          })
        }
      });
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
  //点击书籍
  bindViewTap: function (event) {
    wx.navigateTo({
      url: '../addCartPage/addCart?id='+event.currentTarget.dataset.book.id,
    })
    // this.setData({ show: true, book: event.currentTarget.dataset.book});
    //console.log(event.currentTarget.dataset.book);
  },
  //搜索框
  onChange(e) {
    this.setData({
      searchvalue: e.detail
    });
  },

  onSearch() {
    wx.showToast({
      title: '搜索功能还没做，偷个懒！',
      icon: 'none',
      duration: 2000
    })
  },
  //点击遮罩层
  onClickHide() {
    this.setData({ show: false});
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

  goToCart(){
    wx.navigateTo({
      url: '../CartPage/Cart',
    })
  },

  goToRecord(){
    wx.navigateTo({
      url: '../RecordPage/Record',
    })
  }

  
  
})