var qqMapKey = 'FNDBZ-MBUW3-VPZ3W-3XZGH-KAHJF-BJBYF'

function distance(start, end, way, res) {
  var url = '';
  if (way.length > 0) {
    url = 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + start + '&to=' + end + '&waypoints=' + way + '&output=json&callback=cb&key=' + qqMapKey;
  } else {
    url = 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + start + '&to=' + end + '&output=json&callback=cb&key=FNDBZ-MBUW3-VPZ3W-3XZGH-KAHJF-BJBYF';
  }
  wx.request({
    url: url,
    method: 'GET',
    success(e) {
      console.log(e);
      var distance = e.data.result.routes["0"].distance;
      res.success(distance);
    },
    fail(e) {
      res.fail(0);
    }
  })

}

function getAdcode(location, result) {
  wx.request({
    url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + location + '&key=' + qqMapKey,
    method: 'GET',
    success(e) {
      console.log("getAdcode", e);
      result.success(e.data.result.ad_info.adcode);

    },
    fail(e) {

    }
  })


}

module.exports = {
  distance: distance,
  getAdcode: getAdcode
}