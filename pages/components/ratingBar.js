// pages/components/ratingBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    isShow: Boolean,
    number: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    totalSize: [false, false, false, false, false]
  },
  attached() {
    if (this.data.isShow) {
      var totalSize = this.data.totalSize;
      var index = this.data.number - 1
      for (var i = 0; i < totalSize.length; i++) {
        if (i <= index) {
          totalSize[i] = true;
        } else {
          totalSize[i] = false;
        }

      }
      this.setData({
        totalSize: totalSize
      })

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击选择星级
    onTapItem(e) {
      console.log(e);
      var index = e.currentTarget.dataset.index;

      var totalSize = this.data.totalSize;

      for (var i = 0; i < totalSize.length; i++) {
        if (i <= index) {
          totalSize[i] = true;
        } else {
          totalSize[i] = false;
        }

      }
      this.setData({
        totalSize: totalSize
      })

      this.triggerEvent("rating", index + 1)
    }
  }
})