// pages/userinfo/username.js
var cisdom = require('../../utils/cisdom.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: ""
  },
  //获取输入框的信息
  inputComplete: function(e) {
    var self = this;
    var name = e.detail.value;
    self.setData({
      name
    });
    console.log("输入的name：{}", self.data.name);
  },
  //修改昵称
  save: function() {
    var name = this.data.name;
    var params = {
      nickname: name,
      // id:"",
      // token:"",
      // sign:""
    };
    console.log("修改昵称-请求参数:{}", params);
    cisdom.request("nickName", params, {
      success(e) {
        console.log("修改成功");

        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1]; //当前页面
        var prevPage = pages[pages.length - 2]; //上一个页面
        prevPage.setData({
          name: name
        })
        wx.navigateBack({

        })
        // wx.redirectTo({
        //   url: 'userinfo',
        // })
        wx.showToast({
          title: '修改昵称成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail(e) {
        console.log("修改失败");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var name = wx.getStorageSync("info").name;
    this.setData({
      name: name
    });
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