var qqMapKey = 'FNDBZ-MBUW3-VPZ3W-3XZGH-KAHJF-BJBYF'

function distance(start, end, way, res) {
  console.log("distance-start", start);
  console.log("distance-end", start);
  console.log("distance-way", way);

  var url = '';
  if (way.length > 0) {
    url = 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + start + '&to=' + end + '&waypoints=' + way + '&output=json&callback=cb&key=' + qqMapKey + "&policy=LEAST_FEE";
  } else {
    url = 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + start + '&to=' + end + '&output=json&callback=cb&key=FNDBZ-MBUW3-VPZ3W-3XZGH-KAHJF-BJBYF' + "&policy=LEAST_FEE";
  }
  wx.request({
    url: url,
    method: 'GET',
    success(e) {
      console.log("distance", e);
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

function getCityInfo(location, result) {
  wx.request({
    url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + location + '&key=' + qqMapKey,
    method: 'GET',
    success(e) {
      console.log(e);
      var res = {
        'county': e.data.result.ad_info.district,
        'address': e.data.result.address,
        'codePath': e.data.result.ad_info.adcode,
        'city': e.data.result.ad_info.city,
        // 'orderAddress': "",
        'lng': e.data.result.ad_info.location.lng,
        'lat': e.data.result.ad_info.location.lat,
        'province': e.data.result.ad_info.province
      }
      console.log("result",res)
      result.success(res)

      // result.success(e.data.result.ad_info.adcode);

    },
    fail(e) {

    }
  })
}

module.exports = {
  distance: distance,
  getAdcode: getAdcode,
  getCityInfo: getCityInfo
}