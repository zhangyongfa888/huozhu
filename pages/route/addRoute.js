// pages/route/addRoute.js
var cisdom = require("../../utils/cisdom.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAddMore: false,
    route_name: "",
    route: [{
      "mobile": "",
      "name": "",
      "province": "",
      "city": "请选择发货地",
      "codePath": "",
      "county": "",
      "address": "",
      "lng": "0",
      "lat": "0",
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
      "countyCode": ""
    }]

  },

  input(e) {
    console.log(e);
    this.setData({
      route_name: e.detail.value
    })

  },
  addMoreCity(e) {
    var route = this.data.route;
    route.push({
      "mobile": "",
      "name": "",
      "province": "",
      "city": "请选择收货地",
      "codePath": "",
      "county": "",
      "address": "",
      "lng": "0",
      "lat": "0",
      "countyCode": ""
    });
  },
  submit(e) {
    console.log(e);
    var r = this.data.route.filter(function(item) {
      return item.lat != 0 || item.lng != 0;
    });
    var isSupei = !this.data.showAddMore;

    var route_name = this.data.route_name;
    var route = JSON.stringify(r);
    cisdom.request(isSupei ? "allotRoute" : "routeAdd", {
      route_name: route_name,
      route: route
    }, {
      success(e) {
        console.log(e)
        wx.showToast({
          title: '添加成功',
          icon: 'none'
        })
        wx.navigateBack({

        })
      },
      fail(e) {}
    })



  },
  chooseAddress(e) {
    console.log(e);
    var type = this.data.type;
    wx.navigateTo({
      url: '../chooseAddress/chooseAddress?id=' + type + "_addroute&index=" + e.detail,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var that = this;


    that.setData({
      type: options.type,
      showAddMore: options.type == 'kuaiyun'
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