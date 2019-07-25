// components/xx_cover_news/xx_cover_news.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        list: {
            type: Array,
            value: [],
            // observer: '_changeList',
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

        preview(e){
            wx.previewImage({
                urls: [e.currentTarget.dataset.url],
            })
        },
        share(e){
            // TODO 把share事件放到外边
            wx.previewImage({
                urls: [e.currentTarget.dataset.url],
            })
        },
        
    }
})
