// pages/tools/setting.js
var cisdom = require('../../utils/cisdom.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 1880,
    status: true
  },
  status: function(e) {
    var that = this;
    console.log(e);
    var status = e.detail.value;
    // 1.开始接单 2.停止接单
    cisdom.request('changeWork', {
      is_work: status ? "1" : "2"
    }, {
      success: function(e) {

      },
      fail: function(e) {
        that.setData({
          status: false
        });
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var info = wx.getStorageSync("info");
    var isWork = info.is_work;

    wx.getSystemInfo({
      success: function(res) {
        var height = res.windowHeight;
        that.setData({
          height: height,
          userinfo: info,
          status: isWork == 1
        });
      },
    })


  },
  onItemClick: function(e) {
    console.log(e);
    var to = e.currentTarget.dataset.to;

    wx.navigateTo({
      url: to,
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