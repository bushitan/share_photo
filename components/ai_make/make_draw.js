
var GP
// var canvas
var downCanvasID
class Draw{
    constructor(_gp, canvas ,width, height){
        GP = _gp
        this.canvas = canvas




        this.ratio = parseFloat(height / width)

        this.canvasWidth = 1000 //固定宽度
        this.borderSize = 20  // 边缘
        this.qrSize = 200
        this.canvasHeight = parseInt(this.canvasWidth * this.ratio) 
            + this.borderSize + this.qrSize

        // 分享到宽高
        this.shareWidth = this.canvasWidth - this.borderSize * 2
        this.shareHeight = parseInt(this.shareWidth * this.ratio)

        // 广告词
        this.slugWidth = 400 
        this.slugHeight = 200
        this.slugX = this.borderSize
        this.slugY = this.canvasHeight - this.slugHeight - this.borderSize

        // 二维码x，y
        this.qrX = this.canvasWidth - this.borderSize - this.qrSize
        this.qrY = this.canvasHeight - this.borderSize - this.qrSize




        console.log(this)
    }

    getWidth() {
        return this.canvasWidth
    }
    getHeight() {
        return this.canvasHeight
    }


    // 设置背景
    setBackground() {
        this.canvas.setFillStyle('white')
        this.canvas.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
    }
    // 设置照片
    setShare(share) {
        this.canvas.drawImage(
            share,
            this.borderSize,
            this.borderSize,
            this.shareWidth, //图片实际宽度
            this.shareHeight //图片实际高度
        )
    }
    // 设置广告词
    setSlug(slug) {

        this.canvas.drawImage(
            slug,
            this.slugX,
            this.slugY,
            this.slugWidth, //图片实际宽度
            this.slugHeight //图片实际高度
        )
    }
    // 设置二维码
    setQR(qr) {
        // debugger
        this.canvas.drawImage(
            qr,
            this.qrX,
            this.qrY,
            this.qrSize, //图片实际宽度
            this.qrSize //图片实际高度
        )
    }

   

   
}

module.exports = Draw