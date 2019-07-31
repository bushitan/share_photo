//app.js

var DIALOG = "1"   // #提示
var HIDDEN = "2"   // #隐藏
var HACK = "3"     // #测试


var SYS = "00"    //#系统
var USER = "01"    // # 用户
var ARTICLE = "02"    // # 文章

App({
    onLaunch: function (options) {
        console.log("[onLaunch] 本次场景值:", options.scene)
        // this.globalData.scene = options.scene
    },
    // globalData: {
    //     userInfo: null,
    //     scene: 1001
    // },
  

    ROUTE: {
        MODE_NORMAL: "normal",
        MODE_POI: "poi",
        MODE_STORE: "store",
    },

    MESSAGE:{
        SYS_SUCCESS: `${HIDDEN}${SYS}001`,
        SYS_ERROR: `${DIALOG}${SYS}002`,
        SYS_ERROR_NETWORK: `${DIALOG}${SYS}003`,
        
        USER_CHECK_SUCCESS: `${DIALOG}${USER}001`  ,//#扫码成功
        USER_NONE: `${HIDDEN}${USER}002`  ,//#登陆失败
        USER_ADD_SUCCESS: `${DIALOG}${USER}003` ,//#更新失败
        USER_ADD_FULL: `${DIALOG}${USER}004`,//#上传满了
        USER_CUSTOMER_NONE: `${DIALOG}${USER}005` ,//#扫码的顾客不存在
        USER_CUSTOMER_NOT_ENOUGH: `${DIALOG}${USER}006` ,//#扫码的顾客不存在
        USER_SELLER_SUCCESS: `${DIALOG}${USER}007` ,//#扫码的顾客不存在
        USER_CUSTOMER_IS_LIKE: `${DIALOG}${USER}008`, //#扫码的顾客不存在
        USER_CUSTOMER_HELP_SUCCESS: `${DIALOG}${USER}009`, //#扫码的顾客不存在
        USER_CUSTOMER_IS_HELP: `${DIALOG}${USER}010`,//#扫码的顾客不存在

        ARTICLE_NONE: `${HIDDEN}${ARTICLE}002`, 
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