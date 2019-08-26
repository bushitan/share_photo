// pages/blogger/blogger.js
var GP
var API = require('../../api/api.js')
var db = require('../../api/db.js')
var pack = require('pack.js')
var bloggerUtils = require('blogger_utils.js')
var APP = getApp()


// ,
// "brickLayout": "plugin://brickLayout/brickLayout"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        brick_option: bloggerUtils.getOption(),
        articleList: [], //文章列表
        tagID: 1,
        tagList:[], //标签列表
        dataSet:[], // 显示的文章
        likeList:[],

        // 刷讯锁
        isLock: false,
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
        // 获取文章列表
        db.articleGetList().then(res => {
            var articleList = res.data.article_list
            var tagList = res.data.tag_list
            var tagID = res.data.tag_list[0].id

            bloggerUtils.setArticleList(articleList) //设置文章列表
            // var tempArtList = bloggerUtils.getArticleByTag(tagID)
            // var dataSet = bloggerUtils.getDataSet(tempArtList)

            GP.setData({
                // dataSet: dataSet,
                tagList: res.data.tag_list,
                tagID: tagID
            })
            GP.getLike()
        })
    },

    getLike(){
        // 增加点赞列表
        db.customerGetLikeList().then(res => {
            var likeList = res.data.like_list
            bloggerUtils.setLikeList(likeList) // 设置点赞列表
            this.switchTab(GP.data.tagID)
            
        })
    },

    /**
     * @method 点击tab
     */
    clickTab(e) {
        var index = e.detail
        var tagID = GP.data.tagList[index].id 
        GP.setData({tagID:tagID})
        this.switchTab(tagID)
    },

    // 切换tab的开关
    switchTab(tagID){
        // debugger
        var tempArtList = bloggerUtils.getArticleByTag(tagID)
        var likeList = bloggerUtils.getLikeList()
        var artList = bloggerUtils.mixArticleLike(tempArtList, likeList)
        var dataSet = bloggerUtils.getDataSet(artList)
        GP.setData({
            dataSet: dataSet,
        })
    },
  
    // 点击跳转文章详情
    tapCard: function (event) {
        const cardId = event.detail.card_id
        var article = bloggerUtils.getArticleByID( cardId)
        // 没有url
        if (article.url == "")
            return
        wx.navigateTo({
            url: '/pages/article/article?url=' + article.url,
        })
    },


    /**
     * @method 点赞事件
     */
    tapLike: function (event) {
        const cardId = event.detail.card_id
        var card = bloggerUtils.getArticleByID(cardId)


        wx.showModal({
            title: '活动已经结束',
            content: '请关注"南宁方特东盟神画"公众号，获取更多活动资讯',
            showCancel:false,
        })
        return 


        // 可以点赞
        if (card.liked ){
            wx.showToast({
                title: '已点赞',
            })
        } else{
            
            db.customerAddLike(cardId).then(res=>{
                console.log(res)
            })
            bloggerUtils.addLike(cardId)
            this.switchTab(GP.data.tagID)
        }
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
     * @打开活动规则提示框
     */
    showDialog: function () {
        // this.setData({
        //     dialogvisible: true
        // })
        wx.navigateTo({
            url: '/pages/article/article?url=https://mp.weixin.qq.com/s/DNJnAd-xNE-UBBv4LYXHQg'
        })
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (e) {
        return APP.onShareAppMessage(e)
    }
})
