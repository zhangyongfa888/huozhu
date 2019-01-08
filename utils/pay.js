var cisdom = require('cisdom.js');
var CryptoJS = require('CryptoJS/rollups/aes.js');


function payByWx() {

}
//1 下单支付3 小费 4 累计支付 5小车）有价格，由现金转为微信支付
function payByBalance(money, orderCode, pwd, res) {
  pwd = CryptoJS.MD5(pwd).toString();
  var param = {
    "type": 4,
    "money": money,
    "orderCode": orderCode,
    "orderPwd": pwd
  }
  cisdom.request("pay", param, res);


}

function payByRecharge() {

}

function whthdraw(money, orderpassword, res) {
  var pwd = CryptoJS.MD5(orderpassword).toString();

  cisdom.request("putForward", {
    money: money,
    orderpassword: pwd
  }, res)
}

function payByAddTips(money, orderCode, pwd, res) {
  pwd = CryptoJS.MD5(pwd).toString();
  var param = {
    "type": 3,
    "money": money,
    "orderCode": orderCode,
    "orderPwd": pwd
  }
  cisdom.request("pay", param, res);


}

function payByAddOrder(money, orderCode, pwd, res) {
  pwd = CryptoJS.MD5(pwd).toString();

  var param = {
    "type": "1",
    "money": money,
    "orderCode": orderCode,
    "orderPwd": pwd
  }
  cisdom.request("pay", param, res);


}


function getBalance(res) {
  var param = {}
  cisdom.request("money", param, {
    success: function(e) {
      res.getBalance(e.data.money);
      res.isSetPwd(e.data.is_password == 1 ? true : false);


    },
    fail: function(e) {
      res.getBalance(0);
      res.isSetPwd(false);
    }
  })

}

function getMoney(res) {
  var param = {}
  cisdom.request("money", param, res)

}
module.exports = {
  payByWx: payByWx,
  payByBalance: payByBalance,
  payByAddTips: payByAddTips,
  payByAddOrder: payByAddOrder,
  getBalance: getBalance,
  getMoney: getMoney,
  payByRecharge: payByRecharge,
  whthdraw: whthdraw
}