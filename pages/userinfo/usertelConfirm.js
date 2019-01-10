// pages/userinfo/usertelConfirm.js
var cisdom = require('../../utils/cisdom.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:"",
    btnStatus: true,//倒计时已结束
    sec: 0,
    btnOk: false,
  },
  //监听输入框
  inputComplete : function (e) {
    var checkNum = e.detail.value;
    var btnOk = "";
    console.log("输入的验证码：{}",checkNum);
    if(checkNum != ""){
      btnOk = true;
    }else{
      btnOk = false;
    }
    this.setData({btnOk,checkNum});
  },
  //获取验证码
  getCheckNum: function () {
    var _this = this;
    // 获取验证码方法
    var params = {
      mobile: _this.data.phone
    };
    cisdom.request("getIdentify", params, {
      success(e) {
        console.log("获取验证码成功", e);
        wx.showToast({
          title: '已发送',
          icon: 'success',
          duration: 1500
        })
      },
      fail(e) {
        console.log("获取验证码失败");
      }
    })
  },
  //倒计时
  checkNum: function () {
    this.getCheckNum();
    var _this = this;
    var timer;
    _this.setData({
      sec: 30,
      btnStatus: false
    });
    console.log("btnStatus:{}",_this.data.btnStatus);
    timer = setInterval(function () {
      if (_this.data.sec > 0) {
        // console.log(_this.data.sec);
        _this.setData({ sec: _this.data.sec - 1 });
        if (_this.data.sec == 0) {
          _this.setData({ btnStatus: true });
          clearInterval(timer);
        }
      }
    }, 1000);
  },
  //验证现在手机号
  update: function () {
    var params = {
      mobile:this.data.phone,
      vcard:this.data.checkNum
    };
    cisdom.request("checkVcard", params, {
      success(e) {
        console.log("验证手机号成功", e);
        wx.navigateTo({
          url: 'usernewtel',
        })
      },
      fail(e) {
        console.log("验证手机号失败");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var phone = wx.getStorageSync("user").mobile;
    var mobile = phone.slice(0, 3) + "****" + phone.slice(7, 11);
    this.setData({ mobile,phone });
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