// components/xx_cover_news/xx_cover_news.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        avatar: {
            type: String,
            value: "",
        },
        user_id: {
            type: Number,
            value: 0,
        },
        name: {
            type: String,
            value: "",
        },
        count: {
            type: Number,
            value: 0,
        },

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 改变
    _change(newVal, oldVal) {
    },

      addPhoto(e){
          this.triggerEvent("addPhoto")
      },
      toRule(){
          wx.navigateTo({
              url: '/pages/article/article?url=https://mp.weixin.qq.com/s/DNJnAd-xNE-UBBv4LYXHQg',
          })
      },
  }
})
