
function article(article_list,tag_id){
    var _list = []
    for (var i =0 ; i < article_list.length ; i++){
        var article = article_list[i]
        if (article.tag_id == tag_id){
            _list.push(create(article))
        }
    }

    return _list
}

function create(article){
    return {
        id: article.id,
        content: article.title,
        backgroundColor: '#ffffff',
        // time: 1533106010,
        likedCount: article.like_count,
        liked: false,
        user: {
            avatar: article.author_logo,
            username: article.author_name,
            userId: '1'
        },
        images: [
            article.cover
        ]
    }
}


/**
 * 瀑布流的配置
 */
var option = {
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

function getArticleByID(article_list,id){
    for (var i = 0; i < article_list.length; i++) {
        var article = article_list[i]
        if (article.id == id) {
            return article
        }
    } 
}

function like(show_list,like_list){
    console.log(show_list, like_list)
    
    for (var i =0 ; i<show_list.length;i++)
        for (var j = 0; j < like_list.length;j++){
            if (show_list[i].id == like_list[j].article_id){
                show_list[i].liked = true
                show_list[i].likedCount++
            }
        }
    return show_list
}

module.exports = {
    article: article,
    option:option,
    getArticleByID: getArticleByID,
    like:like,
}



















var dataSet = [
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
]