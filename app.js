//app.js
App({
  onLaunch: function () {
 
  },
  

    ROUTE: {
        MODE_NORMAL: "normal",
        MODE_POI: "poi",
        MODE_STORE: "store",
    },

    // 基础的分享页面功能
    onShareAppMessage(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: res.title || '南宁好吃好喝好玩',
            path: res.path || '/pages/route/route',
            // imageUrl: res.imageUrl || "../../images/icon_share_base_cup.png",

        }
    },

})