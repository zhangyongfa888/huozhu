// pages/userinfo/userinfo.js
var cisdom = require('../../utils/cisdom.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sex: "",
    name: "",
    mobile: "",
    head_img: "https://wx.cisdom.com.cn/public/smallob/image/ic_main_menu_head.png"
  },
  /**
   * 跳转到昵称页面
   */
  toName: function() {
    wx.navigateTo({
      url: 'username',
    })
  },
  /**
   * 点击更换头像
   */
  toPic: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths;
        cisdom.uploadFile(tempFilePaths[0], {
          type: "1"
        }, {
          success: function(e) {
           that.setData({
             head_img: tempFilePaths[0]
           })
          },
          fail: function(e) {}
        });
      },
    })
  },
  /**
   * 更换性别
   */
  toSex: function() {
    // var choose = 
    // wx.showModal({
    //   showCancel: false,
    //   title: '',
    //   content: '哈哈哈'
    // });
    var sex = "";
    var self = this;
    wx.showActionSheet({
      itemList: ['男', '女'],
      success(res) {
        console.log(res.tapIndex);
        if (res.tapIndex == 0) {
          sex = '男';
        } else {
          sex = '女';
        }
        self.setData({
          sex
        });
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
    console.log("选择了：{}", self.data.sex);
    //进入修改性别方法
    var sex = "";
    if (self.data.sex == 0) {
      sex = 1;
    } else {
      sex = 2;
    }
    var params = {
      sex
    };
    console.log("修改性别-准备参数：{}", params);
    cisdom.request("sex", params, {
      success(e) {
        console.log("修改成功");
      },
      fail(e) {
        console.log("修改失败");
      }
    })
  },
  /**
   * 更换手机号
   */
  toTel: function() {
    wx.navigateTo({
      url: 'usertel',
    })
  },
  //获取用户信息
  getUserInfo: function() {
    //获取用户信息
    var self = this;
    var params = {};
    cisdom.request("UserInfo", params, {
      success(e) {
        console.log("获取用户信息成功", e);
        var user = wx.getStorageSync("info");

        user['sex'] = e.data.sex;
        user['mobile'] = e.data.mobile;
        user['name'] = e.data.name;
        user['head_img'] = e.data.head_img;

        wx.setStorageSync("info", user);
        console.log("获取人员信息：{}", user);
        var sex = "";
        if (user.sex == 1) {
          sex = '男';
        } else if (user.sex == 2) {
          sex = '女';
        }
        var phone = user.mobile;
        var mobile = phone.slice(0, 3) + "****" + phone.slice(7, 11);
        self.setData({
          name: user.name,
          sex,
          mobile: mobile,
          head_img: user.head_img
        });
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserInfo();
    // console.log("初始sex:{}",this.data.sex);
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
    // this.getUserInfo();
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