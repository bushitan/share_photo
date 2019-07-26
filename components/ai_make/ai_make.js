// components/xx_cover_news/xx_cover_news.js

var downCanvasID = "downCanvas"
var canvas
var Draw = require('make_draw.js')
var draw
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        create:{
            type: Object,
            value: null,
            observer: '_create',
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        borderSize:20,
        logoHeight:90,


        canvasWidth: 1000,
        canvasHeight: 1000,


        shareImage:"", // 待分享的图片
        userQR:"", // 用户二维码
        slugImage:"", // 广告词图片
    },

    /**
     * 组件的方法列表
     */
    methods: {

        _create(newVal, oldVal){
            if(newVal){
                this.setData({
                    shareImage: newVal.shareImage,
                    userQR: newVal.userQR,
                    slugImage: newVal.slugImage,
                })

                this.start() // 开始制作分享图

                this.setData({
                    create:null
                })
            }
        },

        start(){

            this.downImage().then(res=>{
                // console.log(res)
                var path = res.path
                var width = res.width
                var height = res.height
                // 绘图

                canvas = wx.createCanvasContext(downCanvasID, this)
                draw = new Draw(this, canvas, width, height)
                this.setData({
                    canvasWidth: draw.getWidth(),
                    canvasHeight: draw.getHeight(),
                })
                draw.setBackground()
                draw.setShare(path)
                draw.setSlug(this.data.slugImage)
                draw.setQR(this.data.userQR)

                // 输出
                this.out()
            })

        },
        // 输出图片
        out() {
            canvas.draw(false, () => {

                wx.hideLoading()  // 取消loading

                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: draw.getWidth(),
                    height: draw.getHeight(),
                    canvasId: downCanvasID,
                    success(res) {
                        console.log(res.tempFilePath)
                        wx.previewImage({
                            urls: [res.tempFilePath],
                        })
                    }
                }, this)
            })
        },

     
        // 1 下载图片
        downImage() {
            return new Promise((resolve, reject) => {
                wx.downloadFile({
                    url: this.data.shareImage, //仅为示例，并非真实的资源
                    success(res) {
                        // resolve(res.tempFilePath)
                        var path = res.tempFilePath
                        wx.getImageInfo({
                            src: path,
                            success(res) {
                                // console.log(res.width)
                                // console.log(res.height)
                                
                                resolve({
                                    path: path,
                                    width: res.width,
                                    height: res.height,
                                })
                            }
                        })
                        
                    }
                })
            })
        },




    }
})
