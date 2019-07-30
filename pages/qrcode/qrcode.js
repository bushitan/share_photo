// pages/qrcode/qrcode.js
var API = require('../../api/api.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var mode = options.mode
        var store_uuid = options.store_uuid || ""

        this.setMode(mode, store_uuid)
 
    },

    setMode(mode, store_uuid){
        var title, userQR
        if (mode == "score") {
            title = "我的集点码"
            userQR = `score,${wx.getStorageSync(API.UUID)},${store_uuid}`
        }
        else{
            title = "奖品兑换码（向工作人员出示）"
            userQR = `prize,${wx.getStorageSync(API.USER_INFO).id},${store_uuid}`
            wx.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#1d2a6d',
                animation: {
                    duration: 400,
                    timingFunc: 'easeIn'
                }
            })
        }
        this.setData({
            title:title,
            mode:mode,
            userQR: userQR
        })
    },
    
})