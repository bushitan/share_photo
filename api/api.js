


var APP_ID = "wxc3cb221202af930a"

// var HOST = "http://www.51zfgx.com:1100/dev/" //第2正式版本
var HOST = "https://www.51zfgx.com/share_photo_server_dev/" //第2正式版本

// var HOST = "https://www.51zfgx.com/dev/" //测试版本
var URL = HOST + "photo/"

module.exports = {
    UUID: "uuid",
    USER_ID: "user_id",
    USER_INFO: "user_info",
    USER_QR:"user_qr",
    OPEN_ID: "open_id",
    APP_ID: "app_id",
    UNION_ID: "union_id",



    SYSTEM_LOGIN: `${URL}system/login/`,
    SYSTEM_SET_USER_INFO: `${URL}system/set/user_info/`, 
    ARTICLE_GET_LIST: `${URL}article/get/list/`,    //#获取标签，文章列表
    ARTICLE_GET_DETAIL: `${URL}article/get/detail/`,//#获取文章详情
    CUSTOMER_GET_USER_INFO: `${URL}customer/get/user_info/`, //#获取当天的分数和礼物领取情况
    CUSTOMER_GET_PHOTO_LIST: `${URL}customer/get/photo_list/`,//#获取获取照片墙列表
    CUSTOMER_GET_TOKEN: `${URL}customer/get/token/`,//#获取七牛云的token
    CUSTOMER_ADD_PHOTO: `${URL}customer/add/photo/`,//#增加照片
    CUSTOMER_GET_QR: `${URL}customer/get/qr/`, //#获取分享二维码
    CUSTOMER_GET_LIKE_LIST: `${URL}customer/get/like_list/`, //#点赞
    CUSTOMER_ADD_LIKE: `${URL}customer/add/like/`, //#点赞
    CUSTOMER_ADD_HELP: `${URL}customer/add/help/`, //#好友助力

    SELLER_ADD_CHECK: `${URL}seller/add/check/`,// #店家核销
    SELLER_GET_LIST: `${URL}seller/get/check_list/`,//#店家获取核销列表
    
}

