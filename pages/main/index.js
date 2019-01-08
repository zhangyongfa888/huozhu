// pages/main/index.js
var dataUtils = require('../../utils/data.js');
var utils = require('../../utils/util.js');
var map = require('../../utils/map.js');
var cisdom = require('../../utils/cisdom.js');
const app = getApp();

function getPrice(that) {


  var route = that.data.sendOrder.route;
  if (route.length < 2) {
    return;
  }
  if (route[0].lat.length == 0 || route[0].lng.length == 0 || route[1].lat.length == 0 || route[1].lng.length == 0 ||
    route[0].lat == '0' || route[0].lng == '0' || route[1].lat == '0' || route[1].lng == '0'
  ) {
    return;
  }
  var category = that.data.sendOrder.category;
  if (category == 2) { //大车

    return;
  }

  var start = route[0].lat + "," + route[0].lng;
  var end = route[route.length - 1].lat + "," + route[route.length - 1].lng;
  var way = "";
  for (var i = 1; i < route.length - 1; i++) {
    way += route[i].lat + "," + route[i].lng + ";";
  }
  way = way.substring(0, way.length - 1);
  console.log("waypoint:", way);
  // 调用接口 计算距离
  // utils.caculatePrice();

  var sendOrder = that.data.sendOrder;
  map.distance(start, end, way, {
    success(distance) {
      sendOrder['distance'] = distance;
      //距离 m
      that.setData({
        sendOrder: sendOrder
      });
      map.getAdcode(start, {
        success(adcode) {
          utils.caculatePrice(distance, adcode, sendOrder.carType, {

            price(price) {
              sendOrder['price'] = price;
              if (price > 0) {

                sendOrder['service'] = "1";
              }
              that.setData({
                sendOrder: sendOrder
              });
              console.log("价格：", price);
            }
          });
        }
      });


    },
    fail(e) {

    }
  });

}

function getLoginstatus(that) {
  var openid = wx.getStorageSync('openid');
  var params = {
    wxId: openid,
    eqp: "",
    device: "3",
    identity: "1",

  }
  cisdom.request("WxLogin", params, {
    success(e) {
      app.globalData.isLogin = true;
      wx.setStorageSync("info", e.data);
      that.setData({
        userinfo: e.data
      })
    },
    fail(e) {

    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [{
        "title": "订单记录",
        "image": "https://wx.cisdom.com.cn/public/smallob/image/ic_menu_order.png",
        "navigate": "../order/orderList"
      }, {
        "title": "我的钱包",
        "image": "https://wx.cisdom.com.cn/public/smallob/image/ic_menu_wallet.png",
        "navigate": "../wallet/wallet"
      }, {
        "title": "我的消息",
        "image": "https://wx.cisdom.com.cn/public/smallob/image/ic_menu_message.png",
        "navigate": "../message/message"
      }, {
        "title": "客服中心",
        "image": "https://wx.cisdom.com.cn/public/smallob/image/ic_me_contact.png",
        "navigate": "../contact/contact"
      }, {
        "title": "更多设置",
        "image": "https://wx.cisdom.com.cn/public/smallob/image/ic_menu_setting.png",
        "navigate": "../setting/setting"
      }


    ],
    tab_index: 0, //快运单还是速配单
    showMenu: false,
    tab_car_list: dataUtils.carTitles,
    current_type_index: 0,
    showGoodsType: false, //显示货物类型
    showCarType: false,
    chooseUint: ["吨", "方"],
    cargoweight: "0",
    chooseIndex: 0,

    sendOrder: {
      distance: 0,
      carType: "1",
      service: "0",
      category: "1",
      carTypeName: dataUtils.carTitles[0].carTypeName,
      route: [{
        "mobile": "",
        "name": "",
        "province": "",
        "city": "请选择发货地",
        "codePath": "",
        "county": "",
        "address": "",
        "lng": "0",
        "lat": "0",
        "orderAddress": "",
        "countyCode": "",

      }, {
        "mobile": "",
        "name": "",
        "province": "",
        "city": "请选择收货地",
        "codePath": "",
        "county": "",
        "address": "",
        "lng": "0",
        "lat": "0",
        "orderAddress": "",
        "countyCode": ""
      }]
    },
    userinfo: {}
  },

  //左上角头像
  showMenu(e) {
    var showMenu = !this.data.showMenu;
    this.setData({
      showMenu: showMenu
    })

  },
  cancelMenu(e) {
    this.setData({
      showMenu: false
    })
  },
  login(e) {
    if (app.globalData.isLogin) {

      wx.navigateTo({
        url: '../userinfo/userinfo',
      })
    } else {
      getLoginstatus(this);

    }
  },
  navigateTo(e) {
    console.log(e);
    wx.navigateTo({
      url: e.currentTarget.dataset.navigate,
    })
    this.setData({
      showMenu: false
    })

  },
  //单位
  bindPickerUnitChange: function(e) {
    this.setData({
      chooseIndex: e.detail.value
    });

  },
  //切换快运单/速配货 tab
  changetab(e) {
    this.setData({
      tab_index: e.currentTarget.dataset.index
    })
  },
  //车型tab
  chooseTitleCarType(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var tab_car_list = this.data.tab_car_list;
    for (var i in tab_car_list) {
      tab_car_list[i].isChecked = false;

    }
    tab_car_list[index].isChecked = true;

    var sendOrder = this.data.sendOrder;
    if (index == 7) { //大型货车
      sendOrder['category'] = "2";
      sendOrder['carType'] = tab_car_list[index].id;
      sendOrder['carTypeName'] = tab_car_list[index].carTypeName;

    } else {
      sendOrder['carType'] = "1"
    }

    this.setData({
      tab_car_list: tab_car_list,
      current_type_index: index,
      sendOrder: sendOrder

    })
    getPrice(this);
  },
  changeSwiper(e) {
    var index = e.detail.current

    var tab_car_list = this.data.tab_car_list;
    for (var i in tab_car_list) {
      tab_car_list[i].isChecked = false;

    }
    tab_car_list[index].isChecked = true;


    var sendOrder = this.data.sendOrder;
    if (index == 7) { //大型货车
      sendOrder['category'] = "2";
      sendOrder['carType'] = tab_car_list[index].id;
      sendOrder['carTypeName'] = tab_car_list[index].carTypeName;

    } else {
      sendOrder['carType'] = "1"
      sendOrder['carType'] = "";
      sendOrder['carTypeName'] = "";
    }

    this.setData({
      tab_car_list: tab_car_list,
      current_type_index: index,
      sendOrder: sendOrder

    })
    getPrice(this);
  },

  //选择路线
  chooseRoute(e) {
    if (app.globalData.isLogin == false) {
      getLoginstatus(this);
      return;
    }
    wx.navigateTo({
      url: '../route/routeList',
    })

  },
  //添加要给收货地
  addMoreCity(e) {

    if (app.globalData.isLogin == false) {
      getLoginstatus(this);
      return;
    }
    var sendOrder = this.data.sendOrder;
    var path = sendOrder.route;
    if (path[path.length - 1].lat == "" || path[path.length - 1].lat == "0") {
      wx.showToast({
        title: '请完善地址信息',
        icon: "none"
      })
      return;
    }
    sendOrder.route.push({
      "mobile": "",
      "name": "",
      "province": "",
      "city": "请选择收货地",
      "codePath": "",
      "county": "",
      "address": "",
      "lng": "0",
      "lat": "0",
      "orderAddress": "",
      "countyCode": ""
    });


    this.setData({
      sendOrder: sendOrder
    })


  },

  //删除路线
  deleteRoute(e) {
    var sendOrder = this.data.sendOrder;
    var route = [];
    for (var i = sendOrder.route.length - 1; i >= 0; i--) {
      if (e.detail != i) {
        route.unshift(sendOrder.route[i]);
      }

    }
    sendOrder.route = route
    console.log(e);
    this.setData({
      sendOrder: sendOrder
    })
    getPrice(this);
  },
  //选择地址
  chooseAddress(e) {
    if (app.globalData.isLogin == false) {
      getLoginstatus(this);
      return;
    }
    var that = this;
    var openSetting = function(e) {
      console.log("openSetting", e);
      var msg = e.errMsg;
      if (msg.indexOf("deny") != -1) {
        wx.showToast({
          title: '请授予小程序访问位置的权限',
          icon: 'none'
        })


      }
      if (msg.indexOf("cancel") != -1) {
        wx.showToast({
          title: '您取消了选择',
          icon: 'none'
        })

      }

    }

    console.log(e);
    wx.chooseLocation({
      success: function(res) {
        if (res.name == '') {
          return;
        }
        console.log(res);
        var snedOrder = that.data.sendOrder;

        var route = snedOrder.route;
        route[e.detail]['city'] = res.address;
        route[e.detail]['address'] = '';
        route[e.detail]['name'] = '';
        route[e.detail]['mobile'] = '';
        route[e.detail]['lng'] = utils.qqMapTransBMap(res.longitude, res.latitude).lng
        route[e.detail]['lat'] = utils.qqMapTransBMap(res.longitude, res.latitude).lat;
        route[e.detail]['orderAddress'] = '';
        snedOrder['route'] = route;
        that.setData({
          sendOrder: snedOrder
        })

        getPrice(that);
      },
      fail: openSetting,
    })

  },
  //点击预约 现在用车 跳转获取用户信息  只能通过点击获取微信用户信息
  addOrder(e) {
    if (app.globalData.isLogin == false) {
      getLoginstatus(this);
      return;
    }
    var sendOrder = this.data.sendOrder;

    var isAuth = app.globalData.isAuth;
    console.log("isAuth", isAuth);

    if (!isAuth) { //没有信息
      wx.navigateTo({
        url: '../login/authinfo',
      })

      return;
    }
    var sendOrder = this.data.sendOrder;
    var date = new Date();
    var minute = 0;
    minute = 10 - date.getMinutes() % 10; //下个整点10分钟
    var time = date.getTime() / 1000 + 60 * minute;
    sendOrder['time'] = time;
    sendOrder['timeStr'] = utils.getYuYueTime(time);

    this.setData({
      sendOrder: sendOrder
    })
    wx.navigateTo({
      url: '../order/addOrder?param=' + JSON.stringify(sendOrder),
    })



  },
  //选择预约时间
  yuyueTime(e) {
    if (app.globalData.isLogin == false) {
      getLoginstatus(this);
      return;
    }
    var isAuth = app.globalData.isAuth;
    console.log("isAuth", isAuth);

    if (!isAuth) { //没有信息
      wx.navigateTo({
        url: '../login/authinfo',
      })

      return;
    }
    var sendOrder = this.data.sendOrder;
    sendOrder['time'] = e.detail;
    sendOrder['timeStr'] = utils.getYuYueTime(e.detail);
    this.setData({
      sendOrder: sendOrder
    })
    wx.navigateTo({
      url: '../order/addOrder?param=' + JSON.stringify(sendOrder),
    })
    console.log(e);
  },

  //点击车长
  onTapCarType(e) {
    console.log(e);
    this.setData({
      showCarType: true
    })
  },
  onTapGoodsType(e) {
    this.setData({
      showGoodsType: true
    })
  },

  //选择货物后
  chooseGoodsType(e) {
    console.log(e);
    var sendOrder = this.data.sendOrder;

    sendOrder['cargoCategory'] = e.detail.cargoCategory.id;
    sendOrder['cargoCategoryName'] = e.detail.cargoCategory.cargo_type;

    sendOrder['cargoType'] = e.detail.cargoType.id;
    sendOrder['cargoTypeName'] = e.detail.cargoType.cargo_type;
    this.setData({
      showGoodsType: false,
      sendOrder: sendOrder
    })
  },
  choosedCarType(e) {
    console.log(e.detail.busSize);
    console.log(e.detail.carType);

    var sendOrder = this.data.sendOrder;
    var busSizeId = "";
    for (var i = 0; i < e.detail.busSize.length; i++) {
      busSizeId += e.detail.busSize[i].id + ",";
    }
    sendOrder['busSize'] = busSizeId.substring(0, busSizeId.length - 1);

    sendOrder['busSizeName'] = utils.getTruckSize(e.detail.busSize);

    var carTypeId = "";
    for (var i = 0; i < e.detail.carType.length; i++) {
      carTypeId += e.detail.carType[i].id + ",";
    }
    sendOrder['carType'] = carTypeId.substring(0, carTypeId.length - 1);

    sendOrder['carTypeName'] = utils.getTruckTypeName(e.detail.carType);
    this.setData({
      showCarType: false,
      sendOrder: sendOrder
    })

  },
  onInputComplete(e) {
    var value = e.detail.value;
    if (value > 100) {
      wx.showToast({
        title: '最多100吨',
        icon: 'none'
      })
      value = 99;
    }
    if (value < 0.01) {
      wx.showToast({
        title: '最少0.01吨',
        icon: 'none'
      })
      value = 0.01;
    }
    var sendOrder = this.data.sendOrder;
    sendOrder['cargoweight'] = value + this.data.chooseUint[this.data.chooseIndex];
    this.setData({
      inputWeight: e.detail.value,
      sendOrder: sendOrder
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var user = wx.getStorageSync('info') || {
      mobile: "",
      head_img: ""
    };
    this.setData({
      userinfo: user
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
    getPrice(this);

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