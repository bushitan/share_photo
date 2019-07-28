
var API = require('api.js')
var IS_CUSTOMER = true
class DB {
    constructor() {
    }
    // 封装基础的请求
    base(options){
        return new Promise((resolve, reject) => {
            var data = options.data || {}
            data['uuid'] = wx.getStorageSync(API.UUID)
            wx.request({
                url: options.url,
                method: options.method || "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: data,
                success(res) {
                    resolve(res)
                },
                fail(res) {
                    console.log(res)
                    reject(res)
                },
            })
        })
    }


    // 获取店铺列表
    baseURL(url,data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: url,
                data:data || {}
            })
            .then(res => resolve(res.data))
            .catch(res => reject(res))
        })
    }


    // 获取微信code
    getWXCode() {
        return new Promise((resolve, reject) => {
            wx.login({
                success(res) { resolve(res.code) },
                fail(res) { return reject(res) }
            })
        })
    }

    /****业务详情****/
    // 1 用户登录认证
    login() {
        return new Promise((resolve, reject) => {
            // API 
            this.getWXCode().then(code => {
                // API 
                this.baseURL( API.SYSTEM_LOGIN, { code: code} )
                .then(res => resolve(res))
                .catch(res => reject(res))
            })
        })
    }


    // 1 系统设置用户信息
    systemSetUserInfo(userInfo) {
        return this.baseURL(API.SYSTEM_SET_USER_INFO, userInfo)
    }

    /***********文章API*************/
    // 2 获取文章列表
    articleGetList() {
        return this.baseURL(API.ARTICLE_GET_LIST)
    }
    // 2 获取文章内容
    articleGetLDetail(article_id) {
        return this.baseURL(API.ARTICLE_GET_DETAIL, { article_id: article_id})
    }


    /***********用户API*************/
    /**
     * @method 获取用户信息
     * @return
     *      count_score 已经获取积分数量
     */
    customerGetUserInfo() {
        return this.baseURL(API.CUSTOMER_GET_USER_INFO)
    }
    /**
     * @method 获取用户的照片列表
     * @return
     *      photo_list 照片列表
     */
    customerGetPhotoList() {
        return this.baseURL(API.CUSTOMER_GET_PHOTO_LIST)
    }
    /**
     * @method 获取七牛token
     * @return
     *      token 上传值
     */
    customerGetToken() {
        return this.baseURL(API.CUSTOMER_GET_TOKEN)
    }

    /**
     * TODO 
     * @method 照片上传七牛云
     */

    /**
     * @method 保存照片
     * @param
     *      image_url 已上传链接
     */
    customerAddPhoto(image_url) {
        return this.baseURL(API.CUSTOMER_ADD_PHOTO, { image_url: image_url })
    }


    /**
     * @method 获取我的二维码
     */
    customerGetQR() {
        return this.baseURL(API.CUSTOMER_GET_QR)
    }
    

    /**
     * @method 点赞列表
     */
    customerGetLikeList() {
        return this.baseURL(API.CUSTOMER_GET_LIKE_LIST)
    }
    
    /**
     * @method 点赞
     * @param
     *      article_id 点赞的文章id
     */
    customerAddLike(article_id) {
        return this.baseURL(API.CUSTOMER_ADD_LIKE, { article_id: article_id })
    }

    /**
     * @method 还有助力
     * @param
     *      customer_id 要助力的id
     */
    customerAddHelp(customer_id) {
        return this.baseURL(API.CUSTOMER_ADD_HELP, { customer_id: customer_id })
    }

    

    

    // SELLER_ADD_CHECK: `${URL}seller/add/check/`,// #店家核销
    //     SELLER_GET_LIST: `${URL}seller/get/check_list/`,//#店家获取核销列表
    /***********商家API*************/
    /**
     * @method 获取用户信息
     * @return
     *      count_score 已经获取积分数量
     */
    sellerAddCheck(customer_id) {
        return this.baseURL(API.SELLER_ADD_CHECK, { customer_id: customer_id})
    }
    /**
     * @method 获取用户信息
     * @return
     *      count_score 已经获取积分数量
     */
    sellerGetList(page_num, range) {
        return this.baseURL(API.SELLER_GET_LIST, { page_num: page_num, range:range})
    }


}


var db = new DB()

module.exports = db


// // 获取微信code
// getWXCode(){
//     return new Promise((resolve, reject) => {
//         wx.login({
//             success(res) { resolve(res.code) },
//         })
//     })
// }

// /****业务详情****/
// //用户登录认证
// login() {
//     return new Promise((resolve, reject) => {
//         // API 
//         this.getWXCode().then(code => {
//             // API 
//             this.base({
//                 url: API.ROUTE_USER_LOGIN,
//                 data: {
//                     code: code,
//                     is_customer: IS_CUSTOMER,
//                     uuid: wx.getStorageSync(API.UUID),
//                 }
//             }).then(res => resolve(res.data.data))
//         })
//     })
// }

// //用户更新信息
// userUpdate(userInfo) {
//     return new Promise((resolve, reject) => {
//         var data = userInfo
//         data['is_customer'] = IS_CUSTOMER
//         data['uuid'] = wx.getStorageSync(API.UUID)
//         this.base({
//             url: API.ROUTE_USER_UPDATE,
//             data: data
//         }).then(res => resolve(res.data.data))
//     })
// }