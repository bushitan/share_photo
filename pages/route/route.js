// pages/user/user.js
var GP
var API = require('../../api/api.js')
var db = require('../../api/db.js')

var RouteUtils = require('routeUtils.js')
var routeUtils
var APP = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShowLogin:!false,

        isRelogin:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        console.log(options.scene)
        




        GP = this
        // wx.showLoading({
        //     title: '加载中...',
        // }) 
        wx.showLoading({
            title: 'loading...',
        })

        db.login().then(res=>{
            wx.hideLoading()
            // debugger
            console.log(res)
            wx.setStorageSync(API.USER_INFO, res.data.user_info)
            wx.setStorageSync(API.UUID, res.data.user_info.uuid)

            GP.checkWM(options)//检测是否帮助好友

            if(res.data.user_info.is_seller == true){
                wx.redirectTo({
                    url: '/pages/seller/seller',
                })
            }

            if (res.message.code == APP.MESSAGE.SYS_SUCCESS){
                wx.switchTab({
                    url: '/pages/blogger/blogger',
                })
            }else{
                wGP.setData({
                    isRelogin:true,
                })
            }
        })
        // GP.test()
    },    

    /**
     * @method 外卖帮助好友
     */
    checkWM(options){
        if (options.hasOwnProperty('scene')) { 
            var sceneList = scene.split('_')
            var customer_id = sceneList[1]
            db.customerAddHelp(customer_id).then(res=>{
                wx.showModal({
                    title: res.message.title,
                    content: res.message.content,
                })
            })
        }
    },

    test() {
        db.articleGetList()
        db.articleGetLDetail(1)

        db.customerGetUserInfo()
        db.customerGetPhotoList()
        db.customerGetToken()
        db.customerAddPhoto("https:test.com")
        db.customerAddLike(1)
        db.customerAddHelp(1)

        db.sellerAddCheck("1cff3e06-adf7-11e9-b8ce-e95aa2c51b5d")
        db.sellerGetList(0,10)
    },


    //获取\更新用户头像信息
    onGetUserInfo: function (e) {
        if (!this.logged && e.detail.userInfo) {
            db.systemSetUserInfo(e.detail.userInfo)
        }
    },




    // navToPOI(mode, poiID){
    //     wx.redirectTo({
    //         url: `/pages/poi/poi?mode=${mode}&poi_id=${poiID}`,
    //     })
    // },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})