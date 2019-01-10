// pages/components/showCarType.js
var dataUtils = require('../../utils/data.js');
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

    list: dataUtils.goodsData,
    children: dataUtils.goodsData[0].children,
    pindex: -1,
    cindex: 0

  },

  /**
   * 组件的方法列表
   */
  methods: {

    onItemCheck(e) {
      console.log(e);
      var list = this.data.list;
      var index = e.currentTarget.dataset.parentindex;
      for (var i in list) {
        list[i]['isChecked'] = false;
      }
      list[index]['isChecked'] = true;
      console.log(list);
      var children = dataUtils.goodsData[index].children;

      for (var i in children) {
        children[i]['isChecked'] = false;
      }
      children[0]['isChecked'] = true;

      this.setData({
        list: list,
        children: children,
        pindex: index,
        cindex: 0
      })
    },
    onChildItemCheck(e) {
      var index = e.currentTarget.dataset.childindex;
      var children = this.data.children;


      console.log(children);
      for (var i in children) {
        children[i]['isChecked'] = false;
      }
      children[index]['isChecked'] = true;

      this.setData({

        children: children,
        cindex: index
      })

    },
    onFinishClick(e) {
      var list = this.data.list;
      var children = this.data.children;
      var pindex = this.data.pindex;
      var cindex = this.data.cindex;
      console.log("p", list[pindex]);
      console.log("c", children[cindex]);
      if (pindex == -1) {
        wx.showToast({
          title: '请选择货物类型',
          icon: 'none'
        })
        return;
      }
      this.triggerEvent("chooseGoodsType", {
        cargoCategory: list[pindex], //大类
        cargoType: children[cindex] //子类
      });
    }
  }
})