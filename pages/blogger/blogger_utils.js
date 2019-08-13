
class BloggerUtils {
    constructor(){
        this.tagList = [] //标签数组
        this.articleList = [] //文章数组
        this.dataSet = [] // 瀑布流
        this.likeList = [] //点赞数组
    }

    /**
     * @method 获取瀑布流的配置
     */
    getOption(){
        return {
            defaultExpandStatus: true,
            backgroundColor: '#ffffff',
            forceRepaint: false,
            columns: 2,
            imageFillMode: 'widthFix',
            icon: {
                fill: 'https://www.51zfgx.com/qiniu/share_photo_image/fang_te/1_2019_07_26_10_14_17.jpg',
                default: 'https://ci.xiaohongshu.com/49fbd3cd-02d4-41f1-b27c-708e5fe8dac3'
            },
            fontColor: '#000'
        }
    }

    /***********标签*************/
    /**
     * @method 设置文章列表
     */
    setTagList(tagList) { this.tagList = tagList}
    /**
     * @method 设置文章列表
     */
    getTagList() { return this.tagList }


    /***********文章和瀑布流*************/
    /**
     * @method 设置文章列表
     */
    setArticleList(articleList) { this.articleList = articleList }    

    /**
     * @method 根据id获取文章
     */
    getArticleByTag(tagID) {
        var _list = []
        var articleList = this.articleList
        for (var i = 0; i < articleList.length; i++) {
            var article = articleList[i]
            if (article.tag_id == tagID) {
                _list.push(article)
            }
        }
        return _list
    }

    /**
     * @method 根据id获取文章
     */
    getArticleByID(id){
        var articleList = this.articleList
        for (var i = 0; i < articleList.length; i++) 
            if (articleList[i].id == id) 
                return articleList[i]
    }

    /***********点赞操作*************/
    /**
     * @method 设置点赞列表
     */
    setLikeList(likeList) { this.likeList = likeList }
    /**
     * @method 获取点赞列表
     */
    getLikeList() { return this.likeList  }
    /**
     * @method 获取点赞列表
     */
    addLike(articleID ) {
        // TODO 文章计数+1 ，增加点赞列表的数据 
        var articleList = this.articleList
        for (var i = 0; i < articleList.length; i++)
            if (articleList[i].id == articleID) 
                articleList[i].like_count = articleList[i].like_count + 1

        
        this.articleList = articleList

        // 点赞列表增加文章
        this.likeList.push({
            article_id: articleID,
        })
     }

    /***********合成最终展示的列表*************/    
    /**
     * @method 合成文章和点赞情况
     */
    mixArticleLike(articleList, likeList) {
        console.log(articleList, likeList)
        for (var i = 0; i < articleList.length; i++)
            for (var j = 0; j < likeList.length; j++) 
                if (articleList[i].id == likeList[j].article_id) 
                    articleList[i].liked = true             
        return articleList
    }

    /**
     * @method 获取最终形式的瀑布流的列表
     */
    getDataSet(articleList) {
        var _list = []
        for (var i = 0; i < articleList.length; i++) {
            var article = articleList[i]
            // if (article.tag_id == tagID) {
            _list.push({
                id: article.id,
                content: article.title,
                backgroundColor: '#ffffff',
                likedCount: article.like_count,
                liked: article.liked || false,
                user: {
                    avatar: article.author_logo,
                    username: article.author_name,
                    userId: '1'
                },
                images: [
                    article.cover
                ]
            })
            // }
        }
        return _list
    }
}

var utils = new BloggerUtils()

module.exports = utils