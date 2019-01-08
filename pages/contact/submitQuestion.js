// pages/tools/submitQuestion.js
var cisdom = require('../../utils/cisdom.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: 0,
    input: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {




  },
  submit: function(e) {

    var value = this.data.input;
    var type = this.data.checked + 1;
    var driver = wx.getStorageSync('driver') || null;
    var mobile = driver.phone;

    cisdom.request("questionReturn", {
      mobile: mobile,
      content: value,
      type: type

    }, {
      success(e) {
        wx.showToast({
          title: '提交成功',
          icon: 'none'
        })
        setTimeout(function() {
          wx.navigateBack({
            delta: 1,
          })

        }, 1500)

      },
      fail(e) {

      }

    });


  },
  checked: function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    this.setData({
      checked: index
    })
  },
  input: function(e) {
    console.log(e);
    this.setData({
      input: e.detail.value
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