// pages/route/routeList.js
var cisdom = require('../../utils/cisdom.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  addRoute(e) {
    wx.navigateTo({
      url: 'addRoute?type=kuaiyun',
    })


  },
  longPress(e) {
    var that = this;
    console.log(e);
    var rid = e.currentTarget.dataset.rid;
    var item = e.currentTarget.dataset.routename;
    wx.showModal({
      title: '提示',
      content: '您正在删除 ' + item + ' 常用路线',
      confirmText: "确认删除",
      cancelText: "取消",
      success(e) {
        if (e.confirm) {
          cisdom.request("routeDel", {
            Rid: rid
          }, {
            success(e) {
              cisdom.request("routeList", {}, {
                success(e) {
                  that.setData({
                    list: e.data
                  })
                }
              })
            }
          })
        }
      }
    })


  },
  onClickItem(e) {

    console.log(e);
    var pages = getCurrentPages();

    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    var route = e.currentTarget.dataset.route;
    var sendOrder = prevPage.data.sendOrder;
    sendOrder.route = route;
    prevPage.setData({
      sendOrder: sendOrder
    })
    wx.navigateBack({

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var that = this;
    cisdom.request("routeList", {

    }, {
      success(e) {
        that.setData({
          list: e.data
        })

      }
    })
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