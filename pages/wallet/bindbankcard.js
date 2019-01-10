// pages/cisdomshipper/wallet/bindbankcard.js
var cisdom = require('../../utils/cisdom.js');

var inputName;
var inputCard;
var from = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showChoose: false,
    chooseData: ["中国银行", "中国工商银行", "中国建设银行", "中国农业银行", "中国邮政储蓄银行", "交通银行", "中信银行", "中国光大银行", "华夏银行", "中国民生银行", "广发银行", "平安银行", "兴业银行", "上海浦东发展银行", "中国邮政储蓄银行"],
    choosed: "请选择"
  },
  //点击选择银行卡
  chooseBankName: function(e) {

    this.setData({
      showChoose: true,
    });
  },
  //选择的银行卡
  onChoosedItem: function(e) {
    console.log(e);
    var name = e.target.dataset.name;
    this.setData({
      choosed: name,
      showChoose: false,
    })

  },
  inputName: function(e) {
    console.log(e);
    inputName = e.detail.value;
  },
  inputCardNum: function(e) {
    console.log(e);
    inputCard = e.detail.value;

  },
  submit: function(e) {
    var that = this;

  


    if (this.data.choosed == '请选择') {
      wx.showToast({
        title: '请选择一张银行里',
        icon: 'none'
      })
      return;
    }
 
    cisdom.request("bandBank", {
      bank_name: that.data.choosed,
      bank_account: inputName,
      bank_card: inputCard,

    }, {
      success: function(e) {
        wx.redirectTo({
          url: from,
        })

      },
      fail: function(e) {}
    });


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    from = options.from;

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