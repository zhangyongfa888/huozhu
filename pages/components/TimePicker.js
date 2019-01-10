// pages/components/TimePicker.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: String
  },

  attached() {
    let date = new Date();
    var range = this.data.range;

    console.log("attached", date);
    var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
    var day = [

      {
        name: "今天",
        value: timeStamp
      }, {
        name: "明天",
        value: timeStamp + 86400
      }, {
        name: "后天",
        value: timeStamp + 86400 * 2
      }
    ];

    // for (var i = 0; i < 3; i++) {
    //   day.push({
    //     name: i = 0 ? "今天" : i = 1 ? "明天" : "后天",
    //     value: i = 0 ? timeStamp : i = 1 ? timeStamp + 86400 : timeStamp + 86400 * 2,
    //   });
    // }
    range[0] = day;
    let hours = []

    let currentHours = date.getHours();
    if (date.getMinutes() > 50) {
      currentHours = currentHours + 1;
    }
    for (var i = currentHours; i < 24; i++) {
      hours.push({
        name: i + "点",
        value: i * 3600
      });
    }
    range[1] = hours;


    let minute = [];
    let currentMinute = date.getMinutes();
    var left = 10 - currentMinute % 10;

    if (date.getMinutes() > 50) {
      currentMinute = 0;
      left = 0;
    }

    for (var i = currentMinute + left; i < 60; i += 10) {
      minute.push({
        name: i + "分",
        value: i * 60
      });
    }
    range[2] = minute;
    this.setData({
      range: range
    })
  },
  /**
   * 组件的初始数据
   */
  data: {

    range: [
      [],

      [],

      [],
    ]
  },



  /**
   * 组件的方法列表
   */
  methods: {


    bindcolumnchange(e) {
      console.log(e);
      var column = e.detail.column;
      var value = e.detail.value;
      this.update(column, value);

    },
    bindchange(e) {
      console.log(e)
      var dayIndex = e.detail.value["0"] | 0;
      var hourIndex = e.detail.value["1"] | 0;
      var minuteIndex = e.detail.value["2"] | 0;

      var range = this.data.range;
      console.log("index:---->", dayIndex, hourIndex, minuteIndex)
      console.log(range[0][dayIndex])
      console.log("time:---->", range[0][dayIndex].value, range[1][hourIndex].value, range[2][minuteIndex].value)
      var timeStamp = range[0][dayIndex].value + range[1][hourIndex].value + range[2][minuteIndex].value;
      console.log(timeStamp);
      this.triggerEvent("time", timeStamp);


    },
    update(column, value) {
      if (column == 0) { //第一列
        if (value == 0) { //今天
          let date = new Date();
          var range = this.data.range;

          var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
          console.log("timeStamp", timeStamp);

          var day = [

            {
              name: "今天",
              value: timeStamp
            }, {
              name: "明天",
              value: timeStamp + 86400
            }, {
              name: "后天",
              value: timeStamp + 86400 * 2
            }
          ];
          range[0] = day;

          let hours = []

          let currentHours = date.getHours();
          if (date.getMinutes() > 50) {
            currentHours = currentHours + 1;
          }
          for (var i = currentHours; i < 24; i++) {
            hours.push({
              name: i + "点",
              value: i * 3600
            });
          }
          range[1] = hours;


          let minute = [];
          let currentMinute = date.getMinutes();
          var left = 10 - currentMinute % 10 + currentMinute;

          if (currentMinute > 50) {
            left = 0;
          }
          for (var i = left; i < 60; i += 10) {
            minute.push({
              name: i + "分",
              value: i * 60
            });
          }
          range[2] = minute;

          this.setData({
            range: range
          })

        } else {
          let date = new Date();
          var range = this.data.range;

          console.log("attached", date);
          var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;

          var day = [

            {
              name: "今天",
              value: timeStamp
            }, {
              name: "明天",
              value: timeStamp + 86400
            }, {
              name: "后天",
              value: timeStamp + 86400 * 2
            }
          ];
          range[0] = day;

          let hours = []

          // let currentHours = date.getHours();
          for (var i = 0; i < 24; i++) {
            hours.push({
              name: i + "点",
              value: i * 3600
            });
          }
          range[1] = hours;

          let minute = [];

          for (var i = 0; i < 60; i += 10) {
            minute.push({
              name: i + "分",
              value: i * 60
            });
          }
          range[2] = minute;
          this.setData({
            range: range
          })
        }


      }
      if (column == 1) { //第二列
        let date = new Date();

        var range = this.data.range;
        let currentHours = date.getHours();
        let minute = [];
        let currentMinute = date.getMinutes();
        var left = currentMinute + 10 - currentMinute % 10;
        if (date.getMinutes() > 50) {
          currentMinute = 0;
          left = 0;
        }
        if (value == 0) { //当前点
          for (var i = left; i < 60; i += 10) {
            minute.push({
              name: i + "分",
              value: i * 60
            });
          }
        } else {
          for (var i = 0; i < 60; i += 10) {
            minute.push({
              name: i + "分",
              value: i * 60
            });
          }
        }

        range[2] = minute;

        this.setData({
          range: range
        })
      }



    },
  }
})