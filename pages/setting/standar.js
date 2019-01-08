// pages/tools/standar.js
var cisdom = require("../../utils/cisdom.js");
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adcode: "131000",
    src: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var adcode = this.data.adcode;


    wx.getLocation({
      success: function(res) {
        console.log(res);
        utils.getAddress(res.latitude, res.longitude, {
          success: function(e) {
            console.log("success", e);
            var code = e.originalData.result.addressComponent.adcode;
            var url = cisdom.getUrl("rates?adcode=" + code)
            that.setData({
              src: url,
              adcode: code
            });
            wx.setNavigationBarTitle({
              title: "收费标准-" + e.originalData.result.addressComponent.city,
            })

            cisdom.request("price", {
              type: "1",
              adcode: code,
              distance: "0"
            }, {
              success: function(e) {

                if (e.data.price == '') {
                  that.setData({
                    src: cisdom.getUrl("rates?adcode=110100"),
                    adcode: "110100"
                  });
                  wx.setNavigationBarTitle({
                    title: "收费标准-北京市",
                  })
                }

              },
              fail: function(e) {

                that.setData({
                  src: cisdom.getUrl("rates?adcode=110100"),
                  adcode: "110100"
                });
                wx.setNavigationBarTitle({
                  title: "收费标准-北京市",
                })
              },

            })

          },
          fail: function(e) {
            console.log("fail", e);
            that.setData({
              src: cisdom.getUrl("rates?adcode=110100"),
              adcode: "110100"
            });
            wx.setNavigationBarTitle({
              title: "收费标准-北京市",
            })
          }
        });

      },
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