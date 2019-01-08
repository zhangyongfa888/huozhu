// pages/tools/checkQuestions.js
var cisdom = require("../../utils/cisdom.js");
var wxParse = require('../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    title: "",
    nodes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.qid;
    var that = this;
    cisdom.request("questionInfo", {
      "Qid": id
    }, {
      success: function(e) {

        var title = e.data.title;
        var content = e.data.content;
        var create_time = e.data.create_time;

        wxParse.wxParse('article', 'html', content, that, 5);

        that.setData({
          content: content,
          title: title,
        });

      },
      fail: function(e) {}

    });

  },
  submitQuestion: function(e) {

    wx.navigateTo({
      url: 'submitQuestion',
    })
  },
  call: function(e) {
    wx.makePhoneCall({
      phoneNumber: '400-796-9898',
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