// pages/customer/customer.js
var GP
var API = require('../../api/api.js')
var db = require('../../api/db.js')
var APP = getApp()

var customerUtils = require('customer_utils.js')
const qiniuUploader = require("../../utils/qiniuUploader");
// 初始化七牛相关参数
// function initQiniu() {
//     var options = {
//         region: 'ECN', // 华东区
//         uptokenURL: 'https://[yourserver.com]/api/uptoken',
//         // uptoken: 'xxxx=',
//         domain: 'http://[yourBucketId].bkt.clouddn.com',
//         shouldUseQiniuFileName: false
//     };
//     qiniuUploader.init(options);
// }

Page({

    /**
     * 页面的初始数据
     */
    data: {

        userInfo: {
            // name: "魏阿未",
            // avatar: "https://ci.xiaohongshu.com/6bc52795-c599-3c27-bacc-a20a33054ff6?imageView2/2/w/828/q/82/format/jpg",
        },
        
        maxScore:30,
        countScore:0,//积分

        photoList: [
        //     {
        //     title: "阿瓦隆",
        //     summary: "阿瓦隆",
        //     start_time: "2019-7-18 15:25:36",
        //     image: "https://ci.xiaohongshu.com/6bc52795-c599-3c27-bacc-a20a33054ff6?imageView2/2/w/828/q/82/format/jpg",
        //     share_image:"https://raw.githubusercontent.com/bushitan/share_photo/master/images/share.jpg"
        // },
        ],


        shareCover:null, //分享海报信息

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        // wx.setStorageSync("uuid", "1cff3e06-adf7-11e9-b8ce-e95aa2c51b5d")
        GP.onInit()

        // GP.baseToSrc()
    },

    baseToSrc(){
        console.log(wx.env.USER_DATA_PATH)
        var bodyData = wx.getStorageSync(API.USER_QR)
        const buffer = wx.base64ToArrayBuffer(bodyData);
        var filePath = wx.env.USER_DATA_PATH + "/qr.png"
        var fx = wx.getFileSystemManager()

        // fx.writeFileSync(filePath, buffer,"base64")
        
        fx.writeFile({
            filePath,
            data: buffer,
            encoding: 'base64',
            success() {
                // cb(filePath);1
                // wx.previewImage({
                //     urls: [],
                // })
                // return ("123");
            },
            fail() {
                return (new Error('ERROR_BASE64SRC_WRITE'));
            },
        });
    },





    /**
     * @method 页面初始化
     */
    onInit() {

        GP.setData({
            userInfo:wx.getStorageSync(API.USER_INFO)
        })

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
        // initQiniu();
        // 微信 API 选文件
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            success: function (res) {
                var filePath = res.tempFilePaths[0];

                // 上传图片
                db.customerGetToken().then(res => {
                    // console.log(res.data.token)
                    Uploader(filePath, res.data.key, res.data.token)
                })

                // 图片压缩
                // wx.compressImage({
                //     src: filePath, // 图片路径
                //     quality: 80, // 压缩质量
                //     success(res){
                //         debugger
                //         var tempFilePath = res.tempFilePath
                //         db.customerGetToken().then(res => {
                //             // console.log(res.data.token)
                //             Uploader(tempFilePath, res.data.key, res.data.token)
                //         })
                //     },
                // })
            }
        })
        
    },


    /**
     * @method 点击分享按钮
     */
    share(e){
        wx.showLoading({
            title: '合成中',
        })
        var share_image = e.detail
        if (wx.getStorageSync(API.USER_QR) == "")
            db.customerGetQR().then(res => {
                console.log(res.data.qr_base64)
                // var user_qr = res.data.qr_base64
                // https://www.51zfgx.com/wxacodeunlimit/wm_1
                var user_qr = "https://www.51zfgx.com/wxacodeunlimit/" + res.data.qr_base64
                wx.setStorageSync(API.USER_QR, user_qr)
                GP.makeShareCover(share_image, user_qr)
            })
        else
            GP.makeShareCover(share_image, wx.getStorageSync(API.USER_QR))
        
    },
    /**
     * 封装分享海报信息
     */
    makeShareCover(share_image, user_qr){
        GP.setData({
            shareCover:{
                shareImage: share_image,
                userQR: user_qr,
                slugImage:'../../images/cavasn_slug.jpg'
            }
        })
    },



    toQR(){
        if (GP.data.countScore < GP.data.maxScore ){
            wx.showModal({
                title: '需要30点才能兑换',
                content: '请把美美的明信片发给好友参与活动',
            })
            return
        }
        wx.navigateTo({
            url: '/pages/qrcode/qrcode?',
        })
    },

    addPhoto(){
        wx.navigateTo({
            url: '/pages/host/host',
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (e) {
        return APP.onShareAppMessage(e)
    }
})

// qiniu/share_photo_image/fang_te/1_2019_07_26_10_08_42.jpg

function Uploader(filePath,key,uptoken){
    // 交给七牛上传
    // debugger
    qiniuUploader.upload(filePath, (res) => {
        console.log('file url is: ' + res.fileUrl)

        // 增加记录
        db.customerAddPhoto(res.fileUrl).then( res=>{
            var code = res.message.code
            wx.showModal({
                title: res.message.title,
                content: res.message.content,
            })
            GP.onInit()
        }) 


    }, (error) => {
        console.error('error: ' + JSON.stringify(error));
    },
        {
            region: 'ECN', // 华北区
            uptoken: uptoken,
            // uptokenURL: 'https://[yourserver.com]/api/uptoken',
            domain: 'https://www.51zfgx.com',
            // shouldUseQiniuFileName: false
            key: key
            // uptokenURL: 'myServer.com/api/uptoken'
        },
        // null,// 可以使用上述参数，或者使用 null 作为参数占位符
        (progress) => {
            console.log('上传进度', progress.progress)
            console.log('已经上传的数据长度', progress.totalBytesSent)
            console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
        }, cancelTask => GP.setData({ cancelTask })
    );
}