// pages/customer/customer.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        userInfo: {
            name: "魏阿未",
            avatar: "https://ci.xiaohongshu.com/6bc52795-c599-3c27-bacc-a20a33054ff6?imageView2/2/w/828/q/82/format/jpg",
        },
        
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