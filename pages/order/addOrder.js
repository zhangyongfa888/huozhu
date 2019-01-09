// pages/order/addOrder.js

var payUtil = require('../../utils/pay.js')

var cisdom = require('../../utils/cisdom.js')
var paramAdd = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {

    showPay: false,
    sendOrder: {
      contactser: "",
      conMobile: "",
      remark: ""
    }
  },
  //选择额外
  chooseExtras: function(e) {
    wx.navigateTo({
      url: 'extras',
    })

  },
  inputRemark: function(e) {
    var sendOrder = this.data.sendOrder;
    sendOrder["remark"] = e.detail.value;
    console.log(e);
    this.setData({
      sendOrder: sendOrder
    });
  },
  chooseaddress: function(e) {
    var that = this;
    var sendOrder = this.data.sendOrder;

    wx.chooseAddress({
      success: function(res) {
        console.log(res);
        sendOrder["contactser"] = res.userName;
        sendOrder["conMobile"] = res.telNumber;
        that.setData({
          sendOrder: sendOrder
        });
      }
    })
  },
  //写表单提交
  addOrder(e) {
    var sendOrder = this.data.sendOrder;
    if (sendOrder.contactser == null || sendOrder.contactser == "") {
      wx.showToast({
        title: '请选择联系人',
        icon: "none"
      })
      return;
    }
    if (sendOrder.conMobile == null || sendOrder.conMobile == "") {
      wx.showToast({
        title: '请选择联系方式',
        icon: 'none'
      })

      return;
    }

    paramAdd = {
      contactser: sendOrder.contactser,
      conMobile: sendOrder.conMobile,
      money: sendOrder.price,
      category: sendOrder.category,
      carType: sendOrder.carType,
      busSize: '0',
      cargoCategory: 0, //大类
      cargoType: 0, //子类

      Did: sendOrder.extrasId + "",
      time: sendOrder.time,
      endTime: '0',
      identity: '1',
      cargoWeight: 0,
      fee: '0',
      fee_apply: '0',
      return_fee: '0',
      orderCode: '0',
      service: sendOrder.service, //是否有价格
      payType: 1,
      type: '1',
      remark: sendOrder.remark,
      distance: sendOrder.distance / 1000,


      busSize: 0,

    }

    for (var i in sendOrder.route) {

      sendOrder.route[i]['name'] = "";
      sendOrder.route[i]['mobile'] = "";
      sendOrder.route[i]['town'] = sendOrder.route[i].city;
      sendOrder.route[i]['orderAddress'] = sendOrder.route[i].order_address;

    }
    paramAdd['route'] = JSON.stringify(sendOrder.route);

    if (sendOrder.category == '2') { //大车
      paramAdd.cargoCategory = sendOrder.cargoCategory, //大类
        paramAdd.cargoType = sendOrder.cargoType, //子类
        paramAdd.busSize = sendOrder.busSize
      paramAdd.carType = sendOrder.carType
      paramAdd.cargoWeight = sendOrder.cargo_weight
      paramAdd.payType = '4'; //1余额支付2微信支付3支付宝支付4现金支付
      paramAdd.money = 0;
      cisdom.request("orderAdd", paramsAdd, {
        success: function(e) {
          that.setData({
            orderCode: e.data.orderCode,
            orderId: e.data.Oid,
          });
          wx.showToast({
            title: '发布成功',
            success: function(e) {
              wx.navigateBack({

              })
            }
          })

        },
        fail: function(e) {

        }
      });

    } else {
      //点击后显示支付方式

      this.setData({
        showPay: true
      })


    }


  },
  closePayMethod(e) {
    this.setData({
      showPay: false
    })
  },
  banlancePay(pwd) {
    var that = this;
    var sendOrder = this.data.sendOrder;

    cisdom.request("orderAdd", paramAdd, {
      success: function(e) {
        that.setData({
          orderCode: e.data.orderCode,
          orderId: e.data.Oid,


        });

        payUtil.payByAddOrder(sendOrder.price, that.data.orderCode, pwd.detail, {
          success: function(e) {

            wx.redirectTo({
              url: 'orderDetails?orderCode=' + that.data.orderCode,
            })

            that.setData({
              showPay: false
            })
          },
          fail: function(e) {

          }
        })
      },
      fail: function(e) {

      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var sendOrder = JSON.parse(options.param);
    console.log(sendOrder);

    sendOrder = Object.assign(sendOrder, this.data.sendOrder);
    this.setData({
      sendOrder: sendOrder
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