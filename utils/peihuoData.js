function getStatusName(status) {
  // 0.无效 10.待接单 20.待联系 30.待装货 40.待订单完成 50.待收货 60 待结清 70待评价 80待司机评价 90待货主评价   100 已评价 110已取消
  if (status == 0) {
    return "无效";
  }
  if (status == 10) {
    return "待接单";
  }
  if (status == 20) {
    return "待联系";
  }
  if (status == 30) {
    return "待装货";
  }
  if (status == 40) {
    return "待完成";
  }
  if (status == 50) {
    return "待收货";
  }
  if (status == 60) {
    return "待结清";
  }
  if (status == 70) {
    return "待评价";
  }
  if (status == 80) {
    return "待司机评价";
  }
  if (status == 90) {
    return "待货主评价";
  }
  if (status == 100) {
    return "已评价";
  }
  if (status == 110) {
    return "已取消";
  }

}


module.exports = {
  getStatusName: getStatusName
}