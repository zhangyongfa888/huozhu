// pages/cisdomshipper/login/login.js
var cisdom = require('../../utils/cisdom.js')
var utils = require('../../utils/util.js');
var phone = '';
var code = '';
var app = getApp();
var _this;
var Interval;

function startCountDown() {
  var time = 30;
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

function getCode() {

  if (utils.isMobile(phone)) {

    var params = {
      mobile: phone,
    }
    cisdom.request("getIdentify", params, {
      success: function(e) {
        startCountDown();
      },

      fail: function(e) {
        console.log("fail", e);

      },
      complete: function(e) {
        console.log("complete", e);
      }
    });

  } else {
    wx.showToast({
      title: '手机号格式不正确',
      icon: 'none'

    })
  }

}

function login() {
  if (utils.isMobile(phone)) {
    var openid = wx.getStorageSync('openid') ;
    var params = {
      wxId: openid,
      vcode: code,
      mobile: phone,
      device: "3",
      eqp: "",
    }
    cisdom.request("bandWx", params, {
      success: function(e) {
        //绑定成功
        //
        app.globalData.isLogin=true;
        wx.setStorage({
          key: 'info',
          data: e.data,
        })
        wx.navigateBack({

        })
      },
      fail: function(e) {

      }

    });


  } else if (code.length != 4) {
    wx.showToast({
      title: '验证码格式不正确',
      icon: 'none'

    })
  } else {
    wx.showToast({
      title: '手机号格式不正确',
      icon: 'none'

    })
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: "获取验证码"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    _this = this;
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
  bindgetuserinfo: function(res) {
    app.globalData.userInfo = res.detail.userInfo
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(Interval)
  },
  onClick: function(e) {
    console.log("onClick", e);

    switch (e.target.id) {
      case 'getcode':
        if (e.target.dataset.cnt == '获取验证码') {
          getCode();
        }


        break;
      case 'mobilelogin':
        login();
        break;
      case 'wxlogin':

        break;
      case 'xieyi':
        wx.navigateTo({
          url: 'agreement',
        })
        break;

    }

  },
  inputComplete: function(e) {
    var that = this;
    switch (e.currentTarget.id) {
      case "phone":
        if (e.detail.cursor == 11) {
          if (utils.isMobile(e.detail.value)) {
            phone = e.detail.value;
          } else {
            wx.showToast({
              title: '手机号格式不正确',
              icon: 'none'

            })
          }
        }
        break;
      case 'getcode':
        if (e.detail.cursor == 4) {
          code = e.detail.value;
        }
        break;

    }
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