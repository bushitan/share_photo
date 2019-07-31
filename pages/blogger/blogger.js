// pages/blogger/blogger.js
var GP
var API = require('../../api/api.js')
var db = require('../../api/db.js')
var pack = require('pack.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        articleList:[],
        brick_option: pack.option,


        
        articleList:[], //文章列表
        tagList:[], //标签列表
        dataSet:[], // 显示的文章
        likeList:[],
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
        // 获取文章列表
        db.articleGetList().then(res => {
            // console.log(res)
            GP.setData({
                articleList: res.data.article_list,
                tagList: res.data.tag_list,
            })
            GP.setShowArticle(res.data.tag_list[0].id)

            // 获取点赞列表
            db.customerGetLikeList().then(res => {
                GP.setData({
                    likeList: res.data.like_list,
                })
                GP.setLikeArticle()
            })
        })

      
    },


    /**
     * @method 文章设置点赞
     */
    setLikeArticle(){        
        GP.setData({
            dataSet: pack.like(GP.data.dataSet, GP.data.likeList)
        })
    },

    /**
     * @method 根据tag显示文章
     */
    setShowArticle(tag_id){
        var artilce_list = GP.data.articleList

        var list = pack.article(artilce_list, tag_id)
        GP.setData({
            dataSet: list
        })
    },

    /**
     * @method 点击tab
     */
    clickTab(e){
        var index = e.detail
        GP.setShowArticle(GP.data.tagList[index].id)
        GP.setLikeArticle()
    },


    tapCard: function (event) {
        const cardId = event.detail.card_id
        var article = pack.getArticleByID(GP.data.articleList, cardId)
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
        var card = pack.getArticleByID(GP.data.dataSet, cardId)
        // 可以点赞
        if (card.liked ){
            wx.showToast({
                title: '已点赞',
            })
        } else{
            db.customerAddLike(cardId).then(res=>{
                console.log(res)
            })

            var likeList = GP.data.likeList
            var temp = {
                article_id: cardId,
                // user_id	: 1,
                id: 2,
            }
            likeList.push(temp)
            GP.setData({ likeList: likeList})
            GP.setLikeArticle()
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})