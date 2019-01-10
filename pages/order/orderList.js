// pages/cisdomshipper/order/orderList.js


const dataSet = require('../../utils/data.js');

var cisdom = require('../../utils/cisdom.js')
var status = 1;
var index = 0;
var _this;
var statusName = ["待接单", "待装货", "待收货", "待评价", "待评价", "已评价", "已评价", "待联系",
  "重新发货", "运送中", "待结清", "待收费", "配货中"
];

function loadData() {
  var page = _this.data.page;



  var params = {
    status: status,
    page: page,
    pageSize: 20
  }
  cisdom.request("orderList", params, {
    success: function(e) {
      wx.stopPullDownRefresh();
      if (e.data.length == 0) {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
        if (page != 1) {
          _this.setData({
            page: page - 1
          })
        }
        return;
      }
      var newData = e.data;
      var oldData = _this.data.orderList;
      for (var i = 0; i < newData.length; i++) {
        var price = parseFloat(newData[i].money);
        var price_amount = parseFloat(newData[i].amount);
        var tip = parseFloat(newData[i].tip);

        if (price_amount == 0) {
          price = price + tip;
        } else {
          price = price_amount + tip;
        }
        newData[i].newprice = price.toFixed(2);

        if (_this.data.currentIndex == 2) {
          newData[i].statusName = "重新发货";
        } else {
          newData[i].statusName = statusName[newData[i].status - 1];

        }

        var carType = newData[i].carType;

        newData[i].carTypeName = dataSet.getCarTitlesNameById(carType);


        var path = [];

        for (var index in newData[i].city) {

          path.push({
            "city": newData[i].city[index],
            "address": ""
          })
        }

        newData[i]['path'] = path;
        oldData.push(newData[i]);

      }


      _this.setData({
        orderList: oldData
      });
    },
    fail: function(e) {

    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    orderList: [],
    currentIndex: 1,
    orderDetail: {},
  },
  onPageChange: function(e) {
    console.log(e);
    index = e.currentTarget.dataset.index;
    if (index == 0) {
      status = 1;

    }
    if (index == 1) {
      status = 4
    }
    if (index == 2) {
      status = 9
    }

    this.setData({
      currentIndex: index,
      page: 1,
      orderList: []
    });
    loadData();


  },
  details: function(e) {
    console.log(e);
    var orderCode = e.currentTarget.dataset.ordercode;
    var status = e.currentTarget.dataset.status;

    if (status >= 4 && status <= 7 || status == 9) {
      wx.navigateTo({
        url: 'orderDetailsNoMap?orderCode=' + orderCode,
      })

    } else {
      wx.navigateTo({
        url: 'orderDetails?orderCode=' + orderCode,
      })

    }

  },
  resend: function(e) {

    var orderCode = e.currentTarget.dataset.ordercode;
    var param = {
      orderCode: orderCode
    }
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面

    cisdom.request("orderInfo", param, {
      success: function(e) {
        var sendOrder = prevPage.data.sendOrder;
        sendOrder["route"] = e.data.route;
        sendOrder["carType"] = e.data.car_type;
        sendOrder["cargoWeight"] = e.data.cargoWeight

        sendOrder["cargoCategory"] = e.data.cargoCategory

        sendOrder["cargoType"] = e.data.cargoType

        sendOrder["category"] = e.data.category



        prevPage.setData({
          sendOrder: sendOrder
        })
        wx.navigateBack({
          delta: 1,
        })

      },
      fail: function(e) {}
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    _this = this;
    this.setData({
      currentIndex: 0,
      page: 1,
      orderList: []
    });
    loadData();

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

    this.setData({
      page: 1,
      orderList: []
    })
    loadData();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var page = this.data.page + 1;
    this.setData({
      page: page
    })
    loadData();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})