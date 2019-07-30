// pages/customer/customer.js
var GP
var API = require('../../api/api.js')
var db = require('../../api/db.js')
var APP = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        prizeList:[],// 已经核销的列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.onInit()
        GP.setData({
            userInfo:wx.getStorageSync(API.USER_INFO)
        })
    },

    /**
     * @method 页面初始化
     */
    onInit() {
        GP.getSellerList()
    },

    /**
     * @method 扫码事件
     */
    scan(){
        wx.scanCode({
            success(res) {
                // debugger
                var r = res.result
                var sceneList = r.split(',')
                if (sceneList[0] == "prize"){
                    var customer_id = sceneList[1]
                    db.sellerAddCheck(customer_id).then(res=>{
                        wx.showModal({
                            title: res.message.title,
                            content: res.message.content,
                        })
                        GP.getSellerList()
                    })
                } else{
                    wx.showModal({
                        title: '温馨提示',
                        content: '您扫的不是方特礼品兑换二维码',
                    })
                }
            }
        })
        //核销
    },

    /**
     * @method 获取扫码列表
     */
    getSellerList(){
        db.sellerGetList(0, 10).then(res => {
            GP.setData({
                prizeList: res.data.prize_list
            })
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})