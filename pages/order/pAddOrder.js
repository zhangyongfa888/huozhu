// pages/order/pAddOrder.js
var cisdom = require("../../utils/cisdom.js");
var map = require("../../utils/map.js");
const addImage = 'https://wx.cisdom.com.cn/public/smallob/image/ic_add.png';

function getPrice(that) {

  var allotAdd = that.data.allotAdd;
  var start = allotAdd.route[0].lat + "," + allotAdd.route[0].lng
  var end = allotAdd.route[1].lat + "," + allotAdd.route[1].lng
  var adcode = allotAdd.route[0].codePath;

  map.distance(start, end, [], {
    success(distance) {
      allotAdd["distance"] = distance / 1000;
      that.setData({
        allotAdd: allotAdd
      })
      cisdom.request("allotPrice", {
        adcode: adcode,
        distance: distance / 1000
      }, {
        success(e) {
          var price = e.data.price;
          allotAdd['money'] = price;

          that.setData({
            allotAdd: allotAdd
          })
          console.log(e);

        },
        fail(e) {}

      })


    },
    fail(e) {

    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showGoodsType: false,
    pics: [
      addImage
    ],
    goodsType: [],
    hasRead: false,
    allotAdd: {
      contactser: null,
      con_mobile: null,
      send_time: "",
      end_time: "",
      cargo_category: null,
      cargo_type: null,
      cargo_img: "",
      remark: "",
      money: "",
      distance: "",
      cargo_weight: "",
      cargo_volume: "",
      pay_type: "",
      route: "",
    }
  },
  showChooseGoodsType(e) {
    var that = this;
    //货物类型
    cisdom.request("allotCargo", {}, {
      success(e) {
        console.log(e);

        that.setData({
          goodsType: e.data,
          showGoodsType: true,
        })
      }
    })


  },
  chooseContact(e) {
    var allotAdd = this.data.allotAdd;
    var that = this;
    wx.chooseAddress({
      success(e) {
        console.log(e);
        allotAdd["contactser"] = e.userName;
        allotAdd["con_mobile"] = e.telNumber;
        that.setData({
          allotAdd: allotAdd
        })
      }
    })

  },

  //选择货物后
  chooseGoodsType(e) {
    var allotAdd = this.data.allotAdd;

    allotAdd['cargo_category'] = e.detail.cargoCategory.id;
    allotAdd['cargoCategoryName'] = e.detail.cargoCategory.cargo_type;

    allotAdd['cargo_type'] = e.detail.cargoType.id;
    allotAdd['cargoTypeName'] = e.detail.cargoType.cargo_type;
    this.setData({
      showGoodsType: false,
      allotAdd: allotAdd
    })
  },

  orderRemark(e) {
    var remark = this.data.allotAdd.remark;
    wx.navigateTo({
      url: 'pOrderRemark?param=' + remark,
    })

  },
  inputVol(e) {
    console.log(e);
    var value = e.detail.value;
    if (value > 1) {
      wx.showToast({
        icon: "none",
        title: '体积不得大于1方',
      })
    }
    var add = this.data.allotAdd;
    add["cargo_volume"] = value;
    this.setData({
      allotAdd: add

    })
  },
  inputWeight(e) {
    console.log(e);
    var value = e.detail.value;
    var add = this.data.allotAdd;
    add["cargo_weight"] = value;
    this.setData({
      allotAdd: add
    })
  },
  orderFreight(e) {

    var allotAdd = this.data.allotAdd;
    var adcode = allotAdd.route[0].codePath;
    var distance = this.data.allotAdd.distance;
    var price=this.data.allotAdd.money;
    wx.navigateTo({
      url: 'pOrderFreight?adcode=' + adcode + "&distance=" + distance + "&price=" + price,
    })
  },

  submit(e) {
    var that = this;
    var add = this.data.allotAdd;

    if (add.con_mobile == null || add.contactser == null) {
      return;
    }
    if (!this.data.hasRead) {
      wx.showToast({
        icon: 'none',
        title: '请先同意《货物托运协议》',
      })
      return;
    }


    var route = JSON.stringify(add.route);
    add["route"] = route;

    var pics = this.data.pics.filter(function(item) {
      return item != addImage
    });

    add['cargo_img'] = JSON.stringify(pics);

    cisdom.request("allotAdd", add, {
      success(e) {
        var order_code = e.data.order_code;
        wx.navigateTo({
          url: 'pWaitOrder?orderCode=' + order_code,
        })
        var route = JSON.parse(add.route);
        add["route"] = route;
        that.setData({
          allotAdd: add
        })

      },
      fail(e) {
        var route = JSON.parse(add.route);
        add["route"] = route;
        that.setData({
          allotAdd: add
        })

      }
    })


  },
  deleteImage(e) {

    var that = this;
    var index = e.currentTarget.dataset.index;

    wx.showModal({
      title: '提示',
      content: '删除该货物图片',
      success(e) {
        if (e.confirm) {
          var pics = this.data.pics.filter(function(item) {
            return item != addImage
          });
          var newPic = [];

          for (var i = 0; i < pics.length; i++) {
            if (index != i) {
              newPic.push(pics[i]);
            }

          }
          newPic.push(addImage);
          that.setData({
            pics: newPic

          });
        }
      }
    })



  },
  uploadImage(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var pics = this.data.pics;
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        pics[index] = tempFilePaths[0];
        that.setData({
          pics: pics

        });
        cisdom.uploadFile(tempFilePaths[0], {
          type: "0"

        }, {
          success: function(e) {
            pics[index] = e.data.file;
            if (index < 2) {
              pics.push(addImage);

            }
            that.setData({
              pics: pics

            });

          },
          fail: function(e) {}
        });


      },
    })
  },

  hasRead(e) {

    this.setData({
      hasRead: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var param = JSON.parse(options.param);
    var allotAdd = this.data.allotAdd;
    allotAdd['route'] = (param.route);
    allotAdd['send_time'] = param.startTime;
    allotAdd['end_time'] = param.endTime;

    allotAdd["pay_type"] = "4"
    this.setData({
      allotAdd: allotAdd
    })


    getPrice(this);


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