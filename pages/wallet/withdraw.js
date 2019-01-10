// pages/cisdomshipper/wallet/withdraw.js
var cisdom = require('../../utils/cisdom.js')
var payUtil = require('../../utils/pay.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canUser: 0,
    disable: true,
    input: '',
    isSetPwd: false,
    showpwd: false,
    inputPwd: "",
  },

  submit: function(e) {

    this.setData({
      showpwd: true,
    });
  },
  //点击忘记密码
  forgetPwd: function(e) {

    wx.navigateTo({
      url: '../wallet/setpassword',
    })
  },
  //输入的支付密码
  passInput: function(e) {
    this.setData({
      inputPwd: e.detail,
    });
  },
  //支付取消
  pwd_cancel(e) {
    this.setData({
      showpwd: false,

    })
  },
  //密码输入完成点击确定
  pwd_confirm: function(e) {
    var that = this;

    payUtil.whthdraw(this.data.input, this.data.inputPwd + "", {
      success: function(e) {
        wx.showToast({
          title: '发起成功！',
          icon: 'none',
          success: function(e) {
            that.setData({
              showpwd: false,
            })
            wx.navigateBack()
          }
        })

      },
      fail: function(e) {

      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    payUtil.getBalance({
      getBalance: function(e) {
        that.setData({
          canUser: e
        })
      },
      isSetPwd: function(e) {
        that.setData({
          isSetPwd: e
        })
      }

    });


  },
  inputMoney: function(e) {

    var input = e.detail.value;


    var disable = input == '' || parseFloat(input) > parseFloat(this.data.canUser) || parseFloat(input) < 100;
    console.log(disable);
    this.setData({
      input: input,
      disable: disable
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