// pages/cisdomshipper/order/extras.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        Did: '1',
        name: '小推车(商议)',
        checked: false
      },
      {
        Did: '2',
        name: '拍照回单(免费)',
        checked: false
      },
      {
        Did: '3',
        name: '纸质回单(免费)',
        checked: false
      },

    ]
  },
  checkboxChange: function(e) {

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    // console.log('checkbox发生change事件，携带value值为：', e)


    var a = '';
    for (var i = 0; i < e.detail.value.length; i++) {
      for (var k = 0; k < this.data.items.length; k++) {
        if (e.detail.value[i] == this.data.items[k].Did) {
          a += this.data.items[k].name + " ";
        }
      }

    }
    var sendOrder = prevPage.data.sendOrder;
    sendOrder['extras'] = a;
    sendOrder['extrasId'] = e.detail.value;
    // var ex = it
    prevPage.setData({
      sendOrder: sendOrder

    })
  },
  onClickConfirm: function(e) {

    console.log('onClickConfirm', e);
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