// pages/tools/message.js
var cisdom = require("../../utils/cisdom.js");

function getData(that) {
  var page = that.data.page;

  cisdom.request("myMessage", {
    page: page,
    pageSize: 20
  }, {

    success: function(e) {
      wx.stopPullDownRefresh();

      var list = that.data.list;
      if (e.data.length == 0 && page == 1) {
        that.setData({
          page: 1,
          list: []
        })

      } else if (e.data.length == 0 && page != 1) {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
        that.setData({
          page: page - 1,
        })

      } else {
        for (var i = 0; i < e.data.length; i++) {
          list.push(e.data[i])
        }
        that.setData({
          list: list,
        })
      }
    },
    fail: function(e) {
      wx.stopPullDownRefresh();
    },

  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {

    page: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    getData(this);
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
    console.log("onPullDownRefresh");
    var page = 1;
    this.setData({
      page: page,
      list: []
    })
    getData(this);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("页面上拉触底事件的处理函数");
    var page = this.data.page + 1;
    this.setData({
      page: page,
    })
    getData(this);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})