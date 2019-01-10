// pages/order/pOrderRemark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    content: "",
  },
  input(e) {
    var value = e.detail.value;
    this.setData({
      content: value
    })
  },

  submit(e) {

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面

    var allotAdd = prevPage.data.allotAdd
    allotAdd["remark"] = this.data.content;
    prevPage.setData({
      allotAdd: allotAdd
    })

    wx.navigateBack({

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      content: options.param
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