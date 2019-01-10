// pages/cisdomshipper/wallet/wallet.js
var cisdom = require('../../utils/cisdom.js');

var payUtils = require('../../utils/pay.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 1000,
    audit_money: 100,
    isSetPwd: false,
    isBankInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  passInput: function(e) {
    console.log(e.detail);



  },

  toNext(e) {

    console.log(e);
    var id = e.currentTarget.id
    if (id == 'bankinfo' && !this.data.isBankInfo) { //查看银行卡信息 没卡
      id = 'bindbankcard?from=bankinfo'
    }

    if (id == 'withdraw' && !this.data.isBankInfo) { //提现 没卡
      id = 'bindbankcard?from=withdraw'

    }
    if (id == 'withdraw' && !this.data.isSetPwd) { //提现 没有密码
      id = 'setpassword?from=withdraw'
    }


    wx.navigateTo({
      url: id,
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
    var _this = this;
    payUtils.getMoney({
      success: function(e) {
        _this.setData({
          money: e.data.money,
          audit_money: e.data.audit_money,
          isSetPwd: e.data.is_password == 1 ? true : false,
          isBankInfo: e.data.bank_card == "" ? false : true,
        })
      },
      fail: function() {

      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  input: function(e) {
    console.log(e);

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