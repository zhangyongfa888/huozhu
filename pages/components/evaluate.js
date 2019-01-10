// pages/component/evaluate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    unCheckedSrc: String,
    CheckedSrc: String,
    dataList: Array,
    viewhidden:Boolean,

  },

  /**
   * 组件的初始数据
   */
  data: {
    num: 4, //后端给的分数,显示相应的星星
    one_1: '',
    two_1: '',
    one_2: 0,
    two_2: 5,
    content: "",

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      this.setData({
        one_1: this.data.num,
        two_1: 5 - this.data.num
      })

    },
    cancel:function(e){
      this.setData({
        viewhidden:true
      })
    },
    in_xin: function(e) {
      var in_xin = e.currentTarget.dataset.in;
      var one_2;
      if (in_xin === 'use_sc2') {
        one_2 = Number(e.currentTarget.id);
      } else {
        one_2 = Number(e.currentTarget.id) + this.data.one_2;
      }
      this.setData({
        one_2: one_2,
        two_2: 5 - one_2
      })
      this.triggerEvent('numChange', one_2);

    },
    choose: function(e) {
      console.log(e);
      var index = e.currentTarget.dataset.index;


      var data = this.data.dataList;
      if (data[index].checked) {
        data[index].checked = false;
      } else {
        data[index].checked = true;
      }
      this.setData({
        dataList: data
      })
      console.log(this.data.dataList);



    },
    submit: function(e) {
      var data = this.data.dataList;
      var ids = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].checked) {
          ids.push(data[i].id);
        }

      }
      var that = this;
      var submit = {
        label: ids,
        content: that.data.content,
        assess: this.data.one_2
      }

      this.triggerEvent('submit', submit);


    },
    content: function(e) {
      this.setData({
        content: e.detail.value
      })
    },

  }
})