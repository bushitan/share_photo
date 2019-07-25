// pages/blogger/blogger.js
var GP
var API = require('../../api/api.js')
var db = require('../../api/db.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataSet: [
            {
                id: '1',
                content: '泰过的面包房可好吃了[详情..]',
                backgroundColor: '#ffffff',
                time: 1533106010,
                likedCount: 0,
                liked: false,
                user: {
                    avatar: '../../images/menu_address.png',
                    username: '禾末',
                    userId: '1'
                },
                images: [
                    'https://ci.xiaohongshu.com/945360ed-be19-356e-b1fd-b41da9850146?imageView2/2/w/828/q/82/format/jpg'
                ]
            },
            {
                id: '2',
                content: '网红拍照泼水节[详情..]',
                backgroundColor: '#ffffff',
                time: 1533106010,
                likedCount: 1,
                liked: true,
                user: {
                    avatar: 'https://img.xiaohongshu.com/avatar/5bd88e91111e9f00017312a2.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    username: '魏阿未',
                    userId: '1'
                },
                images: [
                    'https://ci.xiaohongshu.com/6bc52795-c599-3c27-bacc-a20a33054ff6?imageView2/2/w/828/q/82/format/jpg',
                ]
            }, 
        ],
        brick_option: {
            defaultExpandStatus: true,
            backgroundColor: '#ffffff',
            forceRepaint: false,
            columns: 2,
            imageFillMode: 'widthFix',
            icon: {
                fill: 'https://raw.githubusercontent.com/bushitan/share_photo/master/images/love.png',
                default: 'https://ci.xiaohongshu.com/49fbd3cd-02d4-41f1-b27c-708e5fe8dac3'
            },
            fontColor: '#000'
        },


        
        articleList:[], //文章列表
        tagList:[], //标签列表
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
    onInit(){
        db.articleGetList().then(res => {
            // console.log(res)
            GP.setData({
                articleList: res.data.article_list,
                tagList: res.data.tag_list,
            })
        })
    },





    tapCard: function (event) {
        const cardId = event.detail.card_id
        // code here.
        console.log('tap card!')
        wx.navigateTo({
            url: '/pages/article/article',
        })
    },
    tapLike: function (event) {
        const cardId = event.detail.card_id
        // code here.
        console.log('tap like!')
    },
    tapUser: function (event) {
        const userId = event.detail.user_id
        // code here.
        console.log('tap user!')
    },
    onCardExpanded: function (event) {
        const cardId = event.detail.card_id
        const expandStatus = event.detail.expand_status
        // code here
        console.log("expand call back")
    },










    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})