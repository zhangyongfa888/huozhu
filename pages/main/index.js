// pages/main/index.js
var dataUtils = require('../../utils/data.js');
var utils = require('../../utils/util.js');
var map = require('../../utils/map.js');
var cisdom = require('../../utils/cisdom.js');
const app = getApp();

function getPrice(that) {

  var sendOrder = that.data.sendOrder;

  var route = sendOrder.route;
  if (route.length < 2) {
    return;
  }
  if (route[0].lat.length == 0 || route[0].lng.length == 0 || route[1].lat.length == 0 || route[1].lng.length == 0 ||
    route[0].lat == '0' || route[0].lng == '0' || route[1].lat == '0' || route[1].lng == '0'
  ) {
    return;
  }
  if (sendOrder.category == '2' || sendOrder.carType == 5) { //大车
    sendOrder['price'] = 0;
    sendOrder['service'] = "0";
    that.setData({
      sendOrder: sendOrder,
    });
    return;
  }
  var qqStart = utils.bMapTransQQMap(route[0].lng, route[0].lat);
  // var qqStart = {
  // lat: route[0].lat,
  // lng: route[0].lng
  // }
  // var qqEnd = {
  //   lat: route[route.length - 1].lat,
  //   lng: route[route.length - 1].lng
  // }
  var qqEnd = utils.bMapTransQQMap(route[route.length - 1].lng, route[route.length - 1].lat);
  console.log("start", qqStart);
  var start = qqStart.lat + "," + qqStart.lng;
  var end = qqEnd.lat + "," + qqEnd.lng;
  var way = "";
  for (var i = 1; i < route.length - 1; i++) {
    var qqWay = utils.bMapTransQQMap(route[i].lng, route[i].lat);
    // var qqWay = {
    //   lat: route[i].lat,
    //   lng: route[i].lng
    // }
    way += qqWay.lat + "," + qqWay.lng + ";";
  }
  way = way.substring(0, way.length - 1);
  console.log("waypoint:", way);
  // 调用接口 计算距离
  // utils.caculatePrice();

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
        "unread": 0,
        "title": "订单记录",
        "image": "https://wx.cisdom.com.cn/public/smallob/image/ic_menu_order.png",
        "navigate": "../order/orderList"
      }, {
        "title": "我的钱包",
        "unread": 0,
        "image": "https://wx.cisdom.com.cn/public/smallob/image/ic_menu_wallet.png",
        "navigate": "../wallet/wallet"
      }, {
        "title": "配货订单",
        "unread": 0,
        "image": "https://wx.cisdom.com.cn/public/smallob/image/ic_menu_wallet.png",
        "navigate": "../peihuo/orderList"
      }, {
        "title": "我的消息",
        "unread": 1,
        "image": "https://wx.cisdom.com.cn/public/smallob/image/ic_menu_message.png",
        "navigate": "../message/message"
      }, {
        "title": "客服中心",
        "unread": 0,
        "image": "https://wx.cisdom.com.cn/public/smallob/image/ic_me_contact.png",
        "navigate": "../contact/contact"
      }, {
        "title": "更多设置",
        "unread": 0,
        "image": "https://wx.cisdom.com.cn/public/smallob/image/ic_menu_setting.png",
        "navigate": "../setting/setting"
      }


    ],
    showcar:false, //显示选择的车型
    showtype:false, //显示货物类型
    cargoCategoryName:"",
    tab_index: 0, //快运单还是速配单
    showMenu: false,
    tab_car_list: dataUtils.carTitles,
    current_type_index: 0,
    showGoodsType: false, //显示货物类型
    showCarType: false,
    chooseUint: ["吨", "方"],
    cargoweight: "0",
    chooseIndex: 0,
    supeiOrder: {
      startTime: 0,
      endTime: 0,
      startTimeStr: "请选择取货开始时间",
      endTimeStr: "请选择取货结束时间",
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
        "order_address": "",
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
        "order_address": "",
        "countyCode": ""
      }]
    },
    sendOrder: {
      distance: 0,
      carType: "1",
      service: "0",
      category: "1",
      carTypeName: "小面包车",
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
      this.getUserInfo();
      console.log("获取用户信息：{}", wx.getStorageSync('info'));
      wx.navigateTo({
        url: '../userinfo/userinfo',
      })
    } else {
      getLoginstatus(this);

    }
    this.setData({
      showMenu: false
    })
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
    if (index == 6) { //大型货车
      sendOrder['category'] = "2";
      sendOrder['carType'] = "";
      sendOrder['carTypeName'] = "";


    } else {
      sendOrder['carType'] = "1"
      sendOrder['category'] = "1";

      sendOrder['carType'] = tab_car_list[index].id;
      sendOrder['carTypeName'] = tab_car_list[index].carTypeName;
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
    if (index == 6) { //大型货车
      sendOrder['category'] = "2";
      sendOrder['carType'] = "";
      sendOrder['carTypeName'] = "";


    } else {
      sendOrder['category'] = "1";
      sendOrder['carType'] = "1"

      sendOrder['carType'] = tab_car_list[index].id;
      sendOrder['carTypeName'] = tab_car_list[index].carTypeName;
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
    var id = e.target.id || "kuaiyun";

    if (app.globalData.isLogin == false) {
      getLoginstatus(this);
      return;
    }
    if (id == 'kuaiyun') {
      wx.navigateTo({
        url: '../route/routeList?from=' + id,
      })
    } else {
      wx.navigateTo({
        url: '../route/pRouteList?from=' + id,
      })
    }


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
    var id = e.currentTarget.id;

    wx.navigateTo({
      url: '../chooseAddress/chooseAddress?id=' + id + "&index=" + e.detail,
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


    var route = sendOrder.route;

    if (route[0].lat.length == 0 || route[0].lng.length == 0 || route[1].lat.length == 0 || route[1].lng.length == 0 ||
      route[0].lat == '0' || route[0].lng == '0' || route[1].lat == '0' || route[1].lng == '0'
    ) {
      wx.showToast({
        icon: 'none',

        title: '请完善信息',
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
      showtype:true,
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
      showcar:true,
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
   * ----------------------------速配---------------------------------------
   * */

  supeiTime(e) {
    console.log(e);
    var supeiOrder = this.data.supeiOrder;
    var id = e.target.id;
    if (id == 'start') {
      supeiOrder.startTimeStr = utils.getYuYueTime(e.detail);
      supeiOrder.startTime = e.detail;
    } else {
      supeiOrder.endTimeStr = utils.getYuYueTime(e.detail);
      supeiOrder.endTime = e.detail;
    }
    this.setData({
      supeiOrder: supeiOrder
    });
  },
  peihuoNext(e) {
    var supeiOrder = this.data.supeiOrder;
    if (supeiOrder.startTime == 0) {
      wx.showToast({
        title: '请选择取货开始时间',
        icon: "none"
      })
      return;
    }
    if (supeiOrder.endTime == 0) {
      wx.showToast({
        title: '请选择取货结束时间',
        icon: "none"
      })
      return;
    }
    if (supeiOrder.route[0].lat == 0 || supeiOrder.route[1].lat == 0) {
      wx.showToast({
        title: '请完善地址信息',
        icon: "none"
      })
      return;
    }
    wx.navigateTo({
      url: '../order/pAddOrder?param=' + JSON.stringify(supeiOrder),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    setTimeout(function() {
      getLoginstatus(that);
    }, 1000)
    var user = wx.getStorageSync('info') || {
      mobile: "",
      head_img: ""
    };
    var phone = user.mobile;
    var mobile = phone.slice(0, 3) + "****" + phone.slice(7, 11)
    this.setData({
      userinfo: user,
      mobile:mobile
    })
  },
  //获取用户信息
  getUserInfo: function () {
    //获取用户信息
    var self = this;
    var params = {};
    cisdom.request("UserInfo", params, {
      success(e) {
        console.log("获取用户信息成功", e);
        var user = {};
        user['sex'] = e.data.sex;
        user['mobile'] = e.data.mobile;
        user['name'] = e.data.name;
        user['head_img'] = e.data.head_img;
        wx.setStorageSync("info", user);
      },
      fail(e) {
        console.log("获取用户信息失败");
        wx.showToast({
          title: e.message,
          icon: 'fail',
          duration: 1500
        });
      }
    });
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