// pages/tools/contact.js
var util = require('../../utils/util.js');
var cisdom = require('../../utils/cisdom.js')

function getData(that, type) {
  cisdom.request("questionList", {
    type: type + 1
  }, {
    success(e) {
      if (type == 0) {
        that.setData({
          data_1: e.data
        })
      }
      if (type == 1) {
        that.setData({
          data_2: e.data
        })
      }
      if (type == 2) {
        that.setData({
          data_3: e.data
        })
      }

    },
    fail(e) {

    }
  });

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [{
      pic: util.getResource("icon_ques_base.png"),
      txt: "基础问题",

    }, {
      pic: util.getResource("icon_ques_order.png"),
      txt: "订单问题",

    }, {
      pic: util.getResource("icon_ques_pay.png"),
      txt: "支付问题",

    }],
    data_1: [],
    data_2: [],
    data_3: [],

    height: 1000,
    checked: 0,
  },

  onItemChecked: function(e) {
    console.log(e)
    var that = this;
    var index = e.currentTarget.dataset.index;
    setTimeout(function() {
      that.setData({
        checked: index
      })
    }, 100);
    getData(that, index);

  },
  onItemSelected: function(e) {
    var that = this;
    var index = e.detail.current

    console.log(e)
    setTimeout(function() {
      that.setData({
        checked: index
      })
    }, 100);

    getData(that, index);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight
        });
      },
    })
    getData(that, 0);

  },
  toDetails: function(e) {
    console.log(e);
    var id = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: 'checkQuestions?qid=' + id,
    })

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