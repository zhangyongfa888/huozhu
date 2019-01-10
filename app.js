//app.js
var cisdom = require("utils/cisdom.js");
App({
  onLaunch: function(ops) {
    console.log(ops);
var that=this;
    // 登录
    wx.login({
      success: res => {
        console.log("login", res);
        cisdom.request("getOpenId", {
          code: res.code
        }, {
          success: function(e) {
            console.log(e);
            var openid = e.data.openid;
            wx.setStorageSync('openid', openid); //存储openid  

            var user = wx.getStorageSync('info') || false;
            if (!user) {
              that.globalData.isLogin = false;
            }else{
              that.globalData.isLogin = true;
            }

          }
        });

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("getSetting", res);
        if (res.authSetting['scope.userInfo']) {
          this.globalData.isAuth = true,
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
        }
      }
    })


  },
  globalData: {
    userInfo: null,
    isAuth: false,
    isLogin: false
  }
}) //app.js