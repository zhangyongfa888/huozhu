// pages/chooseAddress/chooseAddress.js

var map = require('../../utils/map.js');
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactser: "",
    con_mobile: "",
    id: "",
    index: 0,
    location: null,
    order_address: "",
    // orderAddress:""

  },
  chooseAddress(e) {
    var that = this;
    // wx.authorize({
    //   scope: 'scope.location',
    //   success(e) {
    wx.chooseLocation({
      success: function(res) {
        console.log(res);

        if (res.name == '') {
          return;
        }
        that.setData({
          location: res
        })

      },
    })
    // }
    // })
  },
  submit(e) {
    console.log(e);
    var that = this;
    var res = this.data.location;
    if (res == {}) {
      return;
    }
    var start = res.latitude + "," + res.longitude;
    //     console.log(res);
    var id = that.data.id;
    var index = that.data.index;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    // console.log('checkbox发生change事件，携带value值为：', e)

    if (id == 'supei') {
      map.getCityInfo(start, {
        success(result) {
          var supeiOrder = prevPage.data.supeiOrder;
          var route = supeiOrder.route;
          route[index] = result;
          route[index]['lng'] = utils.qqMapTransBMap(result.lng, result.lat).lng
          route[index]['lat'] = utils.qqMapTransBMap(result.lng, result.lat).lat;

          route[index]['name'] = that.data.contactser;
          route[index]['mobile'] = that.data.con_mobile;
          route[index]['order_address'] = that.data.order_address;

          supeiOrder['route'] = route;
          prevPage.setData({
            supeiOrder: supeiOrder,
          })
        }
      });

    } else {

      map.getCityInfo(start, {
        success(result) {
          var sendOrder = prevPage.data.sendOrder;
          var route = sendOrder.route;
          route[index] = result;
          route[index]['lng'] = utils.qqMapTransBMap(result.lng, result.lat).lng
          route[index]['lat'] = utils.qqMapTransBMap(result.lng, result.lat).lat;

          route[index]['name'] = that.data.contactser;
          route[index]['mobile'] = that.data.con_mobile;
          route[index]['order_address'] = that.data.order_address;

          sendOrder['route'] = route;
          console.log("sendOrder", sendOrder);

          prevPage.setData({
            sendOrder: sendOrder,
          })


        }
      });




    }

    wx.navigateBack({

    })


  },
  inputContact(e) {
    this.setData({
      contactser: e.detail.value,

    })
  },
  inputMobile(e) {
    this.setData({
      con_mobile: e.detail.value,

    })
  },
  inputAddress(e) {
    this.setData({
      order_address: e.detail.value,

    })
  },
  chooseContact(e) {
    var allotAdd = this.data.allotAdd;
    var that = this;
    wx.chooseAddress({
      success(e) {
        console.log(e);
        that.setData({
          contactser: e.userName,
          con_mobile: e.telNumber,
          order_address: e.detailInfo
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this;
    this.setData({
      id: options.id,
      index: options.index
    })

    wx.chooseLocation({
      success: function(res) {
        console.log(res);

        if (res.name == '') {
          return;
        }
        that.setData({
          location: res
        })

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