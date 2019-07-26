



module.exports = {
    photoToShare: photoToShare
}

function photoToShare(share_image, user_qr){

    console.log(share_image)

    wx.downloadFile({
        url: share_image, //仅为示例，并非真实的资源
        success(res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
                wx.previewImage({
                    urls: [res.tempFilePath],
                })
                // wx.playVoice({
                //     filePath: res.tempFilePath
                // })
            }
        }
    })
}