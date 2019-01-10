// pages/tools/settingpwd.js
var input1 = "";
var input2 = "";
var pay = require("../../utils/pay.js");
var cisdom = require("../../utils/cisdom.js");
var util = require("../../utils/util.js")
var Interval;

function startCountDown(_this) {
  var time = 10;
  Interval = setInterval(function() {
    time--;
    if (time == 0) {
      var timeshow = "获取验证码"
      clearInterval(Interval)

    } else {
      var timeshow = time + "S"
    }
    _this.setData({
      count: timeshow
    });



  }, 1000)

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSetPwd: false,
    count: '获取验证码',
    inputPhone: "",
    inputCode: "",
  },
  inputphone: function(e) {
    console.log(e);

    this.setData({
      inputPhone: e.detail.value
    });

  },
  inputcode: function(e) {
    this.setData({
      inputCode: e.detail.value
    });
  },
  getcode: function(e) {

    var that = this;
    if (!util.isMobile(this.data.inputPhone)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
      return;
    }
    if (this.data.inputPhone != wx.getStorageSync("info").mobile) {
      wx.showToast({
        icon: 'none',
        title: '请输入当前登录的手机号',
      })
      return;
    }

    if (this.data.count == '获取验证码') {
      this.setData({
        count: '30S', //A立即设置 防止连点
      })

      cisdom.request("vcode", {
        mobile: that.data.inputPhone,

      }, {
        success: function(e) {
          startCountDown(that);

        },
        fail: function(e) {
          this.setData({
            count: '获取验证码',
          })
        }

      })


    }






  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var info = wx.getStorageSync("info");
    if (info.is_password == 1) { //设置了支付密码
      this.data.isSetPwd = true;
      wx.setNavigationBarTitle({
        title: '重置支付密码',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '设置支付密码',
      })
      this.data.isSetPwd = false;
    }
  },
  input1: function(e) {
    console.log(e);
    input1 = e.detail.value;
  },
  input2: function(e) {
    input2 = e.detail.value;
  },
  submit: function(e) {

    //设置过密码
    if (this.data.isSetPwd) {
      var vode = this.data.inputCode;
      var mobile = this.data.inputPhone;
      if (mobile != wx.getStorageSync("info").mobile) {

        wx.showToast({
          icon: 'none',
          title: '请输入当前登录的手机号',
        })
        return;
      }
      if (vode.length != 4) {
        wx.showToast({
          icon: 'none',
          title: '验证码太短啦',
        })
        return;

      }
      if (input1 != input2) {
        wx.showToast({
          icon: 'none',
          title: '两次密码不一致请检查',
        })
        return;
      }
      if (input1.length < 6 || input2.length < 6) {
        wx.showToast({
          icon: 'none',
          title: '密码太短啦',
        })
        return;
      }
      pay.resetPwd(input1, mobile, vode, {
        success: function(e) {
      
          wx.navigateBack()

        },
        fail: function(e) {}
      });





    } else {
      if (input1 != input2) {
        wx.showToast({
          icon: 'none',
          title: '两次密码不一致请检查',
        })
        return;
      }
      if (input1.length < 6 || input2.length < 6) {
        wx.showToast({
          icon: 'none',
          title: '密码太短啦',
        })
        return;
      }

      pay.setPwd(input1, {
        success: function(e) {
          console.log(e);
          wx.navigateBack({

          })
        },
        fail: function(e) {}
      });

    }


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
    clearInterval(Interval)

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