// pages/cisdomshipper/wallet/bankinfo.js
var pay = require('../../utils/pay.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankName: "",
    account: "",
    cardNum: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    pay.getMoney({
      success: function(e) {
        console.log(e);
        that.setData({
          bankName: e.data.bank_name,
          account: e.data.bank_account,
          cardNum: e.data.bank_card
        });

      },
      fail: function(e) {}
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