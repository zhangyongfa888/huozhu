// pages/components/payMethod.js
var cisdom = require("../../utils/cisdom.js");
var payUtils = require('../../utils/pay.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    payMoney: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    money: 0,
    isSetPwd: false,
    isBankInfo: false,
    checkedBalance: false,
    checkedWexin: true,
    showSixPwd: false,
    pwd: "",
  },

  attached: function() {

    var _this = this;
    //查询余额
    payUtils.getMoney({
      success: function(e) {
        _this.setData({
          money: e.data.money,
          audit_money: e.data.audit_money,
          isSetPwd: e.data.is_password == 1 ? true : false,
          isBankInfo: e.data.bank_card == "" ? false : true,
        })
      },
      fail: function() {

      }
    })


  },
  moved: function() {},
  detached: function() {},

  /**
   * 组件的方法列表
   */
  methods: {
    chooseBl() {
      var _this = this;
      payUtils.getMoney({
        success: function(e) {
          _this.setData({
            money: e.data.money,
            audit_money: e.data.audit_money,
            isSetPwd: e.data.is_password == 1 ? true : false,
            isBankInfo: e.data.bank_card == "" ? false : true,
          })

          if (_this.data.money == 0) {

            return;
          }
          _this.setData({
            checkedBalance: true,
            checkedWexin: false,
          })

        },
        fail: function() {

        }
      })



    },
    chooseWx() {
      this.setData({
        checkedBalance: false,
        checkedWexin: true,
      })
    },
    recharge() {
      wx.navigateTo({
        url: '../wallet/recharge',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    submit() {
      var _this = this;
      payUtils.getMoney({
        success: function(e) {
          _this.setData({
            money: e.data.money,
            audit_money: e.data.audit_money,
            isSetPwd: e.data.is_password == 1 ? true : false,
            isBankInfo: e.data.bank_card == "" ? false : true,
          })

          if (_this.data.checkedBalance) { //余额支付

            if (_this.data.isSetPwd) { //设定了支付密码
              //密码弹窗

              _this.setData({
                showSixPwd: true
              })

            } else {
              wx.navigateTo({
                url: '../wallet/settingpwd',
              })
            }


          } else {
            
            _this.triggerEvent("WxPay");

          }
        },
        fail: function() {

        }
      })





    },
    forgetPwd() {
      wx.navigateTo({
        url: '../wallet/settingpwd',
      })
    },
    pwd_cancel() {
      this.setData({
        showSixPwd: false
      })

    },
    pwd_confirm() {
      //支付.
      this.triggerEvent("banlancePay", this.data.pwd);
      console.log(this.data.pwd);

    },
    passInput(e) {
      console.log(e);
      this.setData({
        pwd: e.detail
      })

    },
    cancelpay(e) {
      this.triggerEvent("closePayMethod")
    }
  }
})