// pages/userinfo/usernewtel.js
var cisdom = require('../../utils/cisdom.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: "",
    btnStatus: true,//倒计时已结束
    sec: 0,
    btnOk: false,
  },
  //新手机号输入
  inputNew: function (e) {
    var phone = e.detail.value;
    this.setData({phone});
  },
  //监听输入框
  inputComplete: function (e) {
    var checkNum = e.detail.value;
    var btnOk = "";
    console.log("输入的验证码：{}", checkNum);
    if (checkNum != "") {
      btnOk = true;
    } else {
      btnOk = false;
    }
    this.setData({ btnOk, checkNum });
  },
  //获取验证码
  getCheckNum: function () {
    var _this = this;
    console.log("新手机号：{}", _this.data.phone);
    if(_this.data.phone != "" && _this.data.phone != undefined){
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
    }else{
      wx.showToast({
        title: '请输入新手机号！',
        icon:'fail',
        duration:1500
      })
    }
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
    console.log("btnStatus:{}", _this.data.btnStatus);
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
  //修改手机号
  updPhone: function () {
    console.log("修改的手机号：{}",this.data.phone);
    var params = {
      mobile: this.data.phone,
      vcard: this.data.checkNum
    };
    cisdom.request("mobile", params, {
      success(e) {
        console.log("修改手机号成功", e);
        wx.navigateBack({
          delta:3
        })
        wx.showToast({
          title: '修改手机号成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail(e) {
        console.log("修改手机号失败");
        wx.showToast({
          title: e.message,
          icon: 'error',
          duration: 1500
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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