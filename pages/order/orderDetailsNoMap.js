// pages/cisdomshipper/order/orderDetailsNoMap.js
var cisdom = require('../../utils/cisdom.js')
var util = require('../../utils/util.js')
var data = require('../../utils/data.js')

var app = getApp();
var orderCode = '';
var statusName = ["待接单", "待装货", "待收货", "待评价", "待评价", "已评价", "已评价", "待联系",
  "已取消", "运送中", "待结清", "待收费"
];



function getData(_this) {
  var param = {
    orderCode: orderCode
  }

  cisdom.request("orderInfo", param, {
    success: function(e) {

      wx.setNavigationBarTitle({
        title: statusName[e.data.status - 1],
      })

      var orderDetail = e.data;
      var category = e.data.cargoCategory;
      var category_child = e.data.cargoType;
      var name = data.getNameById(category, category_child);
      orderDetail.cargoCategory = name.categoryPName;
      orderDetail.cargoType = name.categoryCName;
      orderDetail.sendTime = util.formatTime(new Date(e.data.sendTime * 1000));

      orderDetail.car_type = data.getCarNameById(e.data.car_type);
      orderDetail.busSize = data.getLengthById(e.data.busSize)

      var pic = orderDetail.pic;

      if (pic == '') {
        orderDetail.pic = util.defaultPic;

      }
      //处理电话
      if (orderDetail.status != 1) {
        var phone = orderDetail.driverMobile;
        if (phone.length != 0) {
          phone = phone.substr(0, 3) + '****' + phone.substr(7);
          orderDetail.driverMobile = phone;
        }

      }
      _this.setData({
        orderDetail: orderDetail
      });



      //费用显示
      var price = parseFloat(e.data.money);
      var price_amount = parseFloat(e.data.amount);
      var tip = parseFloat(e.data.tip);

      if (price_amount == 0) {
        price = price + tip;
      } else {
        price = price_amount + tip;
      }
      //显示添加小费的按钮
      _this.setData({
        price: "￥" + price
      })

      var payType = e.data.payType;
      var isPay = e.data.isPay;
      var isService = e.data.service;
      var orderStatus = e.data.status;
      //运费详情
      if (isPay == '0') { //  //是否支付(0 未支付  1已支付)
        if (e.data.category == 1) {
          if (payType == "4" && isService == "1") {
            _this.setData({
              payStatus: "现金支付"
            })
            if (orderStatus == '4' || orderStatus == '5' || orderStatus == '6' || orderStatus == '7' || orderStatus == '9') {
              _this.setData({
                pricedetails: false,
              })
            } else {
              _this.setData({
                pricedetails: true,
              })
            }
          } else if (payType == "4" && isService == "0") {
            _this.setData({
              payStatus: "线下议价",
              pricedetails: false,
            })
          }

        } else { //大车
          _this.setData({
            payStatus: "线下议价",
            pricedetails: false,
          })

        }

      } else {
        if (e.data.category == 1) {
          if (isService == '0') {
            _this.setData({
              payStatus: "已支付",
              pricedetails: false,
            })
          } else {
            if (orderStatus == '4' || orderStatus == '5' || orderStatus == '6' || orderStatus == '7' || orderStatus == '9') {
              _this.setData({
                payStatus: "已支付",
                pricedetails: false,
              })
            } else {
              _this.setData({
                payStatus: "已支付",
                pricedetails: true,
              })
            }
          }
        } else {
          _this.setData({
            payStatus: "已支付",
            pricedetails: false,
          })
        }

      }

    },
    fail: function(e) {

    },
    complete: function(e) {
      wx.stopPullDownRefresh();
    }

  })

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 100,
    height: 100,
    orderDetail: {},
    price: "",
    payStatus: "已支付",
    pricedetails: true,


    CheckedSrc: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545382417&di=2a00b9a75720735812ddbe553b09e6c3&imgtype=jpg&er=1&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F35%2F48%2F84573be699a14ff.jpg",
    unCheckedSrc: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544787700466&di=88a63652ac9aed50c3d0a28141b633f6&imgtype=0&src=http%3A%2F%2Fgallery.cache.wps.cn%2Fgallery%2Ffiles%2Fmat_material%2F2011%2F11%2F18%2Fstars%2F05502ec1_32f2_44d3_933f_66983a2cc7d0.png",
    evaluateData: [{
      "name": "准时送达",
      "id": "1"

    }, {
      "name": "准时送达",
      "id": "2",
    }, {
      "name": "准时送达",
      "id": "3",
    }, {
      "name": "准时送达",
      "id": "4",
    }, {
      "name": "准时送达",
      "id": "5",
    }, {
      "name": "准时送达",
      "id": "6",
    }],
    isShowEavluate: false,
  },

  submit: function(e) {
    //点击弹窗提交
    var that = this;

    console.log(e.detail);
    cisdom.request("assess", {
      orderCode: orderCode,
      assess: e.detail.assess,
      label: e.detail.label + "",
      content: e.detail.content,
      driver_id: that.data.orderDetail.driverId
    }, {
      success: function(e) {
        that.setData({
          isShowEavluate: false
        });
        getData(that);
      },
      fail: function(e) {

      }
    });

  },
  //点击评价按钮 弹出评价窗口
  evaluate: function(e) {

    this.setData({
      isShowEavluate: true
    });


  },

  ReceiveGoods: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您要确认收货吗?',
      showCancel: true, //是否显示取消按钮
      cancelText: "取消", //默认是“取消”
      cancelColor: '#ec6700', //取消文字的颜色
      confirmText: "确认", //默认是“确定”
      confirmColor: '#ec6700', //确定文字的颜色
      success: function(res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定

          cisdom.request("orderSuccess", {
            "driverId": that.data.orderDetail.driverId,
            "money": that.data.orderDetail.price,
            "isPay": that.data.orderDetail.isPay,
            "orderCode": that.data.orderDetail.orderCode

          }, {
            success: function(e) {
              getData(that);
            },
            fail: function(e) {

            }
          });

        }
      },
      fail: function(res) {}, //接口调用失败的回调函数
      complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）


    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var systeminfo = wx.getSystemInfo({
      success: function(res) {

        that.setData({
          height: res.screenHeight,
          width: res.screenWidth,
        });
      },
      fail: function(res) {},
      complete: function(res) {},
    })

    orderCode = options.orderCode;

    getData(this);
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
  openAddress: function(e) {
    console.log(e);

    var qq = util.bMapTransQQMap(e.currentTarget.dataset.route.lng, e.currentTarget.dataset.route.lat);
    const latitude = parseFloat(qq.lat)
    const longitude = parseFloat(qq.lng)


    wx.openLocation({
      latitude,
      longitude,
      scale: 28,
    })
  },
  call: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

    var param = {
      orderCode: orderCode
    }
    var _this = this;
    getData(this);

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