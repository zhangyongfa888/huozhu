// pages/cisdomshipper/wallet/recharge.js

var cisdom = require('../../utils/cisdom.js')
var payUtil = require('../../utils/pay.js')

function getData(that) {
  cisdom.request("recharge", {}, {
    success: function (e) {

      that.setData({
        list: e.data
      });
    },
    fail: function (e) { }
  });


}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [10, 200, 500, 1000],
    showPayMethod: false,
    balance: "",
    payMoney: "",
    wxChecked: true,
    balanceChecked: false,
    isSetPwd: false,
    showpwd: false,
    height: 1920,
  },
  recharge: function (e) {
    var money = e.currentTarget.dataset.index;
    var _this = this;
    _this.setData({
      showPayMethod: true,
      payMoney: money
    })


  },
  //隐藏支付方式
  hidePayMethod: function (e) {
    this.setData({
      showPayMethod: false,
      payMoney: 0,
    })
  },
  //选择微信支付
  onCheckdWx: function (e) {
    var checkedwx = !this.data.wxChecked;
    this.setData({
      wxChecked: checkedwx,
      balanceChecked: false,
    })
    console.log(checkedwx);

  },
  //选择余额支付
  onCheckdBalance: function (e) {
    var checkedbalance = !this.data.balanceChecked;
    this.setData({
      balanceChecked: checkedbalance,
      wxChecked: false
    })
    console.log(checkedbalance);
  },
  goPay: function (e) {
    if (this.data.balanceChecked) { //选择余额支付
      //输入支付密码支付
      if (this.data.isSetPwd) {
        //弹出密码窗口
        this.setData({
          showpwd: true
        })


      } else {
        //没有设置过支付密码
        wx.navigateTo({
          url: '../wallet/setpassword',
        })
      }

    } else if (this.data.wxChecked) { //选择微信支付
      var that = this;
      wx.getStorage({
        key: 'openid',
        success: function (res) {
          console.log(res);
          var openid = res.data;
          var payMoney = that.data.payMoney;
          cisdom.request("litePay", {
            type: 2,
            openid: openid,
            money: payMoney
          }, {
              /**
               * appid : wxb4ba3c02aa476ea1
               * partnerid : 1900006771
               * package : Sign=WXPay
               * noncestr : 41e5752f2852896db0bf51102b776456
               * timestamp : 1528857169
               * prepayid : wx131032490754264eead4f7442554920345
               * sign : 4383C75A936EA3E51D54F0E572E0C5F9
               */

              success: function (e) {
                wx.requestPayment({
                  timeStamp: e.data.timestamp + "",
                  nonceStr: e.data.noncestr,
                  package: e.data.package + "&prepay_id=" + e.data.prepayid,
                  signType: 'md5',
                  paySign: e.data.sign,
                  success: function (e) {
                    console.log("success", e);

                  },
                  fail: function (e) {
                    console.log("fail", e);
                    wx.showModal({
                      title: '提示',
                      content: e.err_desc,
                    })

                  },
                  complete: function (e) {
                    console.log(e);
                  }

                })

              },
              fail: function (e) {

              }
            })
        },
      })



    }
  },

  //输入的支付密码
  passInput: function (e) {
    this.setData({
      inputPwd: e.detail,
    });
  },
  //点击忘记密码
  forgetPwd: function (e) {

    wx.navigateTo({
      url: '../wallet/setpassword',
    })
  },
  //支付取消
  pwd_cancel(e) {
    this.setData({
      showPay: false,
      showPayMethod: false,
      wxChecked: false,
      balanceChecked: false,
      balance: 0,
      isSetPwd: false,
      showpwd: false,
      inputPwd: ""
    })
  },
  //密码输入完成点击确定
  pwd_confirm: function (e) {
    var that = this;

    payUtil.payByRecharge(this.data.payMoney, this.data.inputPwd, {
      success: function (e) {
        wx.showToast({
          title: '支付成功！',
          icon: 'none'
        })
        that.setData({
          showPay: false,
          showPayMethod: false,
          wxChecked: false,
          balanceChecked: false,
          balance: 0,
          isSetPwd: false,
          showpwd: false,
        })
        getData(this);
      },
      fail: function (e) {

      }
    })




  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    getData(this);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        });

      },
    })
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

  }
})