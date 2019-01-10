// pages/order/pWaitOrder.js

var cisdom = require("../../utils/cisdom.js");

function getData(that) {
  cisdom.request("allotOrderDetail", {
    order_code: that.data.orderCode
  }, {
    success(e) {

      var data=e.data;
      data.list=[{
        
      },{},{}]
      data.route = [{
        "mobile": "",
        "name": "",
        "province": "",
        "city": "请选择发货地",
        "codePath": "",
        "county": "",
        "address": "",
        "lng": "0",
        "lat": "0",
        "order_address": "",
        "countyCode": "",

      }, {
        "mobile": "",
        "name": "",
        "province": "",
        "city": "请选择收货地",
        "codePath": "",
        "county": "",
        "address": "",
        "lng": "0",
        "lat": "0",
        "order_address": "",
        "countyCode": ""
      }]
      that.setData({
        orderDetail: data
      })
    },
    fail(e) {}
  })
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderCode: "",
    orderDetail: {
     
    },

  },
  priceDetail(e) {
    var orderCode = this.data.orderCode;
    var adcode = this.data.orderDetail.route[0].city_code;
    var distance = this.data.orderDetail.distance;
    var price = this.data.orderDetail.money;
    wx.navigateTo({
      url: 'pOrderFreight?orderCode=' + orderCode + "&adcode=" + adcode + "&distance=" + distance + "&price=" + price,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log("orderCode", options.orderCode);
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight
        })
      },
    })
    this.setData({
      orderCode: options.orderCode
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    getData(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})