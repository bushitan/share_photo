// pages/exchange/exchange.js
var GP
var API = require('../../api/api.js')
var db = require('../../api/db.js')
// var db = new DB()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        // GP.getUserInfo()
        GP.setData({ userInfo:wx.getStorageSync(API.USER_INFO)})
    },
    onGetUserInfo(e){
        if (!this.logged && e.detail.userInfo) {

            var userInfo = e.detail.userInfo
            userInfo.name = GP.data.userInfo.name
            userInfo.phone = GP.data.userInfo.phone
            db.systemSetUserInfo(e.detail.userInfo).then(res=>{
                wx.showModal({
                    title: res.message.title,
                    content: res.message.content,
                    success(){
                        wx.redirectTo({
                            url: '/pages/route/route',
                        })
                        // wx.navigateBack({
                            
                        // })
                    },
                })
                
            })
        }
    },

    nameInput: function (e) {
        var userInfo = GP.data.userInfo
        userInfo.name = e.detail.value
        this.setData({
            userInfo: userInfo
        })
    },
    phoneInput: function (e) {
        var userInfo = GP.data.userInfo
        userInfo.phone = e.detail.value
        this.setData({
            userInfo: userInfo
        })
    },


    // getUserInfo(){
    //     // 获取商户的信息
    //     var userInfo = wx.getStorageSync(API.USER_INFO, userInfo)
    //     var storeUUID = userInfo.store_uuid

    //     // 商户请求
    //     db.storeInfo(storeUUID).then(storeInfo => {
    //         GP.setData({
    //             isLoading: false,
    //             userInfo: userInfo,
    //             storeInfo: storeInfo,
    //             radioItems: [
    //                 {
    //                     name: '普通模式', value: STORE_MODE_NORMAL,
    //                     checked: storeInfo.mode == STORE_MODE_NORMAL ? true : false
    //                 },
    //                 {
    //                     name: '分享模式', value: STORE_MODE_SHARE,
    //                     checked: storeInfo.mode == STORE_MODE_SHARE ? true : false
    //                 },
    //                 {
    //                     name: '普通分享并行模式', value: STORE_MODE_ALL,
    //                     checked: storeInfo.mode == STORE_MODE_ALL ? true : false
    //                 }
                    
    //             ],
    //         })
    //         GP.switchModeShow()
    //     })
    // },

    // // 模式选择
    // radioChange: function (e) {
    //     console.log('radio发生change事件，携带value值为：', e.detail.value);

    //     var radioItems = this.data.radioItems;
    //     for (var i = 0, len = radioItems.length; i < len; ++i) {
    //         radioItems[i].checked = radioItems[i].value == e.detail.value;
    //     }
    //     // 设置普通、分享表单展示
    //     console.log(radioItems) 

    //     this.setData({
    //         radioItems: radioItems,
    //     });
    //     GP.switchModeShow()
    // },

    // // 控制模式表单展示开关
    // switchModeShow(){
    //     var showNormal = false
    //     var showShare = false
    //     var radioItems = this.data.radioItems;
    //     if (radioItems[0].checked)
    //         showNormal = true
    //     else if (radioItems[1].checked)
    //         showShare = true
    //     else {
    //         showNormal = true
    //         showShare = true
    //     }
    //     GP.setData({
    //         showNormal: showNormal,
    //         showShare: showShare,
    //     })
    // },

    // formSubmit(e) {
    //     console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //     var data = e.detail.value
    //     data["store_uuid"] = GP.data.storeInfo.uuid
    //     db.storeUpdate(data).then(res => {
    //         var message = res.message
    //         var store = res.data
    //         var pages = getCurrentPages()
    //         var prevPage = pages[pages.length - 2]
    //         prevPage.setData({
    //             store: store
    //         })
    //         wx.showModal({
    //             title: message.title,
    //             content: message.content,
    //             showCancel: false,
    //             confirmText: "返回",
    //             success() {
    //                 wx.navigateBack({

    //                 })
    //             },

    //         })
    //     })
    // },
    // formReset() {
    //     console.log('form发生了reset事件')
    // },




    // getStoreDetail(options) {
    //     var pages = getCurrentPages()
    //     var prevPage = pages[pages.length - 2]
    //     var userInfo = prevPage.data.userInfo
    //     GP.setData({
    //         isLoading: false,
    //         detailList: detailList,
    //         store: store,
    //     })
    // },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

})