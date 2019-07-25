// pages/article/article.js
var GP
var API = require('../../api/api.js')
var db = require('../../api/db.js')
var APP = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            'https://ci.xiaohongshu.com/6bc52795-c599-3c27-bacc-a20a33054ff6?imageView2/2/w/828/q/82/format/jpg',
            'https://ci.xiaohongshu.com/794b56e3-e5e3-3fe2-849f-fea365fddda4?imageView2/2/w/828/q/82/format/jpg',
            'https://ci.xiaohongshu.com/5dc448c3-fbc9-35f2-ba23-25f73fbad900?imageView2/2/w/828/q/82/format/jpg',
            'https://ci.xiaohongshu.com/d5599a06-6d67-3293-bfab-3029b8d5ae19?imageView2/2/w/828/q/82/format/jpg',
            'https://ci.xiaohongshu.com/c9755e0f-0229-3cb7-b6e6-791f8c93e3e5?imageView2/2/w/828/q/82/format/jpg',
        ],
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,

        userInfo:{
            name:"魏阿未",
            avatar:"https://ci.xiaohongshu.com/6bc52795-c599-3c27-bacc-a20a33054ff6?imageView2/2/w/828/q/82/format/jpg",
        },


        content:'<div data-v-f8e7a182="" class=""><p data-v-f8e7a182="">名声在外的泰国清迈网红面包房，大量植物摆台，陈列细节用心程度之高堪比小型户外婚礼~</p><p data-v-f8e7a182="">店面室内比脑补的感觉要小，要在图7是独立小木屋里自选面包结账，堂食需要到隔壁房间，座位多，也有饮品可点~</p><p data-v-f8e7a182="">面包价格和国内相当，口味嘛……和店面颜值相比就逊色许多<img data-v-f8e7a182="" src="//ci.xiaohongshu.com/xy_emo_r_shiwang.png?v=2" width="23" height="23"></p><p data-v-f8e7a182="">  📷拍照Tips：面包房内光线偏暗，可取景的范围不大，记得把脸面向窗口方向噢~否则对比度会偏高，不好后期</p><p data-v-f8e7a182="">🏠店名：Forest Bake</p><p data-v-f8e7a182="">🚕地址：用Grab打车直接输店名即可，距老城约15分钟车程，城郊方向</p><p data-v-f8e7a182="">📌📌📌营业时间：周五-周二 上午10：30-下午5：00</p><p data-v-f8e7a182="">   📢📢📢周三周四休息，勿扑空！！！！！！！！</p><p data-v-f8e7a182="">&nbsp;</p><p data-v-f8e7a182="">泰国自由行攻略 清迈探店咖啡店推荐 清迈游必去的餐厅 清迈美食 <a data-v-f8e7a182="" href="/user/profile/56826634cb35fb7e671d6bfc" owl="mention/56826634cb35fb7e671d6bfc" class="mention" data-owl-imp="true">@生活薯</a>  <a data-v-f8e7a182="" href="/user/profile/5a152ef8e8ac2b5c7a805197" owl="mention/5a152ef8e8ac2b5c7a805197" class="mention" data-owl-imp="true">@吃货薯</a>  <a data-v-f8e7a182="" href="/user/profile/587f16f55e87e7535ee15896" owl="mention/587f16f55e87e7535ee15896" class="mention" data-owl-imp="true">@生活研究所</a></p></div>',

        articleDetail:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        GP = this
        db.articleGetLDetail(1).then(res=>{
            GP.setData({
                articleDetail:res.data.article_detail
            })
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})