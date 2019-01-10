// pages/cisdomshipper/order/orderDetails.js
var cisdom = require('../../utils/cisdom.js')
var payUtil = require('../../utils/pay.js')
var utils = require('../../utils/util.js')
var dataSet = require('../../utils/data.js')
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');

var app = getApp();
var statusName = ["待接单", "待装货", "待收货", "待评价", "待评价", "已评价", "已评价", "待联系",
  "已取消", "运送中", "待结清", "待收费"
];
var orderCode = '';

function getData(_this) {

  var param = {
    orderCode: orderCode
  }
  cisdom.request("orderInfo", param, {
    success: function(e) {

      //添加地图标注 发货地收货地
      var marks = [];
      for (var i = 0; i < 2; i++) {
        var qq = utils.bMapTransQQMap(e.data.route[i].lng, e.data.route[i].lat)
        var marker = {
          iconPath: i == 0 ? "http://app.zdhuoyunbao.com/public/smallob/image/ic_main_start_address.png" : "http://app.zdhuoyunbao.com/public/smallob/image/ic_main_end_address.png",
          id: i,
          latitude: qq.lat,
          longitude: qq.lng,
          width: 26,
          height: 31
        }
        marks[i] = marker;

      }
      //设置标题 订单状态
      wx.setNavigationBarTitle({
        title: statusName[e.data.status - 1],
      })



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
        addtip: e.data.status == 1 && e.data.category == 1,
        price: price
      })


      e.data.driverCarName = dataSet.getCarNameById(e.data.driverCar); //显示车型
      e.data.car_type = dataSet.getCarNameById(e.data.car_type);
      var pic = e.data.pic; //司机头像
      if (pic == '') {
        e.data.pic = utils.defaultPic;

      }


      var status = e.data.status; //订单状态
      if (status == 1) {
        //待接单 显示所有司机位置
        for (var i = 0; i < e.data.itude.length; i++) {
          var qq = utils.bMapTransQQMap(e.data.itude[i].lng, e.data.itude[i].lat)
          var marker = {
            iconPath: "http://app.zdhuoyunbao.com/public/smallob/image/ic_map_driver.png",
            id: i + 2,
            latitude: qq.lat,
            longitude: qq.lng,
            width: 27,
            height: 16
          }
          marks[i + 2] = marker;
        }


      } else if (status == 8 || status == 2 || status == 12) { //待联系 显示顶部司机信息
        //司机车型信息


        
        // 调用接口 计算距离
        qqmapsdk.calculateDistance({
          from: e.data.driverLat + "," + e.data.driverLng,
          to: e.data.route[0].lat + "," + e.data.route[0].lng,
          success: function(res) {
            console.log("success", res);
            var distance = res.result.elements[0].distance;
            if (distance > 1000) {
              distance = (distance / 1000).toFixed(3) + "公里";
            } else {
              distance = distance + "米";
            }
            _this.setData({
              distance: distance
            });

          },
          fail: function(res) {
            console.log("fail", res);
          },
          complete: function(res) {
            console.log("complete", res);
          }
        });
      } else if (status == 10 || status == 3 || status == 11) {

      }


      var systeminfo = wx.getSystemInfo({
        success: function(res) {

          _this.setData({
            orderInfo: e.data,
            markers: marks,
            height: res.screenHeight,
            width: res.screenWidth,
          });
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      //订单状态


      _this.mapCtx.moveToLocation()

    },
    fail: function(e) {}

  });
}
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status: statusName,
    orderInfo: {},
    distance: "",
    markers: [],
    height: 100,
    width: 100,
    price: "0.00",
    payMoney: 0,
    addtip: false,
    isAddTip: false,
    showPay: false,
    showPayMethod: false,
    wxChecked: false,
    balanceChecked: false,
    balance: 0,
    isSetPwd: false,
    showpwd: false,
  },
  call: function(e) {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.orderInfo.driverMobile,
    })
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
            "driverId": that.data.orderInfo.driverId,
            "money": that.data.orderInfo.price,
            "isPay": that.data.orderInfo.isPay,
            "orderCode": that.data.orderInfo.orderCode

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
  orderDetailsNoMap: function(e) {

    wx.navigateTo({
      url: 'orderDetailsNoMap?orderCode=' + orderCode,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    orderCode = options.orderCode;
    var that = this;
    qqmapsdk = new QQMapWX({
      key: 'FNDBZ-MBUW3-VPZ3W-3XZGH-KAHJF-BJBYF'
    });
    getData(this);



  },
  //加小费
  addtip: function(e) {
    this.setData({
      showPay: true,
      isAddTip: true,
    })
  },
  //弹出支付方式
  pay: function(e) {

    this.setData({
      showPay: true,
      isAddTip: false,
    })
  },
  //输入的价格
  pay_input: function(e) {
    console.log(e);
    var num = e.detail.value;
    this.setData({
      payMoney: num,
    });

  },
  pay_cancel: function(e) {
    this.setData({
      showPay: false,
      payMoney: 0,

    })
  },
  //确定
  pay_confirm: function(e) {
    // //请求余额
    var that = this;
    payUtil.getBalance({
      getBalance: function(e) {
        that.setData({
          balance: parseFloat(e),
          showPay: false,
          showPayMethod: true,
        })
      },
      isSetPwd: function(e) {
        that.setData({
          isSetPwd: e
        })
      }

    });

  },
  //隐藏支付方式
  hidePayMethod: function(e) {
    this.setData({
      showPayMethod: false,
      payMoney: 0,
    })
  },
  //选择微信支付
  onCheckdWx: function(e) {
    var checkedwx = !this.data.wxChecked;
    this.setData({
      wxChecked: checkedwx,
      balanceChecked: false,
    })
    console.log(checkedwx);

  },
  //选择余额支付
  onCheckdBalance: function(e) {
    var checkedbalance = !this.data.balanceChecked;
    this.setData({
      balanceChecked: checkedbalance,
      wxChecked: false
    })
    console.log(checkedbalance);
  },
  //充值
  recharge: function(e) {
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },
  // 选择完支付方式后去支付：余额或者微信
  goPay: function(e) {
    if (this.data.balanceChecked) { //选择余额支付
      //输入支付密码支付
      if (this.data.isSetPwd) {
        //弹出密码窗口
        this.setData({
          showpwd: true
        })


      } else {
        //没有设置过支付密码
        wx.navigateTo({
          url: '../wallet/setpassword',
        })
      }

    } else if (this.data.wxChecked) { //选择微信支付
      wx.showModal({
        title: "微信支付",
        content: '暂不可用',
      })

    }
  },
  //支付取消
  pwd_cancel(e) {
    this.setData({
      showPay: false,
      showPayMethod: false,
      wxChecked: false,
      balanceChecked: false,
      balance: 0,
      isSetPwd: false,
      showpwd: false,
      inputPwd: ""
    })
  },
  //输入的支付密码
  passInput: function(e) {
    this.setData({
      inputPwd: e.detail,
    });
  },
  //点击忘记密码
  forgetPwd: function(e) {

    wx.navigateTo({
      url: '../wallet/setpassword',
    })
  },
  //密码输入完成点击确定
  pwd_confirm: function(e) {
    var that = this;
    if (this.data.isAddTip) {
      payUtil.payByAddTips(this.data.payMoney, orderCode, this.data.inputPwd, {
        success: function(e) {
          wx.showToast({
            title: '支付成功！',
            icon: 'none'
          })
          that.setData({
            showPay: false,
            showPayMethod: false,
            wxChecked: false,
            balanceChecked: false,
            balance: 0,
            isSetPwd: false,
            showpwd: false,
            isAddTip: false
          })
          getData(this);
        },
        fail: function(e) {

        }
      })

    } else {
      payUtil.payByBalance(this.data.payMoney, orderCode, this.data.inputPwd, {
        success: function(e) {
          wx.showToast({
            title: '支付成功！',
            icon: 'none'
          })
          that.setData({
            showPay: false,
            showPayMethod: false,
            wxChecked: false,
            balanceChecked: false,
            balance: 0,
            isSetPwd: false,
            showpwd: false,
          })
          getData(this);
        },
        fail: function(e) {

        }
      })

    }


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.mapCtx = wx.createMapContext('map')

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