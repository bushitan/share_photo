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
    },

    /**
     * @method 页面初始化
     */
    onInit() {

        db.sellerGetList(0, 10).then(res=>{
            GP.setData({
                prizeList:res.data.prize_list
            })
        })

        var customer_id = 1
        db.sellerAddCheck(customer_id)
    },

    /**
     * @method 扫码事件
     */
    scan(){
        wx.scanCode({
            success(res) {
                var customer_id =  1
                db.sellerAddCheck(customer_id)
            }
        })
        //核销
       
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})