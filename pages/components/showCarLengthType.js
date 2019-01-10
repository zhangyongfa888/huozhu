// pages/components/showCarLengthType.js
var dataUtils = require('../../utils/data.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    carLengthList: dataUtils.getCarLengthData,
    carTypeList: dataUtils.getCarTypeData
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseCarLength(e) {
      var carLengthList = this.data.carLengthList;
      var index = e.currentTarget.dataset.index;
      if (!carLengthList[index].isChecked) {
        var choosed = carLengthList.filter(function(item) {
          return item.isChecked;
        });
        if (choosed.length > 2) {
          wx.showToast({
            title: '最多选择三个',
            icon: 'none'
          })

        } else {
          carLengthList[index]['isChecked'] = !carLengthList[index].isChecked;
        }
      } else {
        carLengthList[index]['isChecked'] = !carLengthList[index].isChecked;
      }

      this.setData({
        carLengthList: carLengthList
      })

    },
    chooseCarName(e) {

      var carTypeList = this.data.carTypeList;
      var index = e.currentTarget.dataset.index;
      if (!carTypeList[index].isChecked) {
        var choosed = carTypeList.filter(function(item) {
          return item.isChecked;
        });
        if (choosed.length > 2) {
          wx.showToast({
            title: '最多选择三个',
            icon: 'none'
          })

        } else {
          carTypeList[index]['isChecked'] = !carTypeList[index].isChecked;
        }
      } else {
        carTypeList[index]['isChecked'] = !carTypeList[index].isChecked;
      }

      this.setData({
        carTypeList: carTypeList
      })
    },
    chooseCarFinish(e) {
      var carType = this.data.carTypeList.filter(function(item) {
        return item.isChecked;
      });

      var busSize = this.data.carLengthList.filter(function(item) {
        return item.isChecked;
      });
      if (carType.length == 0) {
        wx.showToast({
          title: '请选择车型',
          icon: 'none'
        })
        return;
      }
      if (busSize.length == 0) {
        wx.showToast({
          title: '请选择车长',
          icon: 'none'
        })
        return;
      }
      this.triggerEvent("choosedCarType", {
        busSize: busSize,
        carType: carType

      })
    }
  },

})