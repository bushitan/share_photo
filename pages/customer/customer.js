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

        userInfo: {
            name: "魏阿未",
            avatar: "https://ci.xiaohongshu.com/6bc52795-c599-3c27-bacc-a20a33054ff6?imageView2/2/w/828/q/82/format/jpg",
        },
        
        countScore:0,//积分

        photoList: [{
            title: "阿瓦隆",
            summary: "阿瓦隆",
            start_time: "2019-7-18 15:25:36",
            image: "https://ci.xiaohongshu.com/6bc52795-c599-3c27-bacc-a20a33054ff6?imageView2/2/w/828/q/82/format/jpg",
            share_image:"https://raw.githubusercontent.com/bushitan/share_photo/master/images/share.jpg"
        },]




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
        // 获取分享数据
        db.customerGetUserInfo().then(res => {
            // console.log(res)
            GP.setData({
                countScore: res.data.count_score,
            })
        })

        // 获取我的相册
        db.customerGetPhotoList().then(res =>{
            GP.setData({
                photoList: res.data.photo_list
            })
        })
    },


    /**
     * @method 添加图片
     */
    addImage(){
        db.customerGetToken().then(res =>{
            //TODO 上传七牛云

            console.log("get token:",res)
            db.customerAddPhoto("https:test.com").then( res=>{
                var code = res.message.code
                // if (code = APP.MESSAGE.USER_ADD_SUCCESS){
                    
                // }

                wx.showModal({
                    title: res.message.title,
                    content: res.message.content,
                })

            }) 
        })
        
    },







    toQR(){
        wx.navigateTo({
            url: '/pages/qrcode/qrcode',
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})