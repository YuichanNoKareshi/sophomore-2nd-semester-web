const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    searchValue:"",
    show: false,
    book: null,
    active:0,
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
      url: 'http://localhost:8080/getOrders',
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
          orders: res.data,
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

  goToCart(){
    wx.navigateTo({
      url: '../CartPage/Cart',
    })
  },

  goToMart(){
    wx.navigateTo({
      url: '../books/books',
    })
  }
  
})