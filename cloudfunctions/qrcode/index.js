// 云函数入口文件
const cloud = require('wx-server-sdk')
const appid = 'wxcd13cbff8a9b81bb'; //小程序appid
const secret = '353b7d94fa849dc7283063aed5430836'; //小程序secret
const envName = 'rich-4gbsq7ct21c19fbd'; // 小程序云开发环境ID
cloud.init({
      env: envName
})

// 云函数入口函数
exports.main = async(event, context) => {
      //先判断云存储是否存在此二维码
      try {
            await cloud.downloadFile({
                  fileID: 'share/' + event.scene + '.jpeg',
            })
            console.log('存在二维码，get from cos')
            return 'share/' + event.scene + '.jpeg'
       //不存在则进行生成
      } catch (e) {
            console.log('不存在二维码则creat start')
            //先获取
            const bufferContent = await cloud.openapi.wxacode.getUnlimited({        //wxacode.getUnlimited接口只能生成已发布的小程序的二维码
                  scene: event.scene,
                  page: 'pages/detail/detail'
            })
            console.log('获取获取',bufferContent)
            //再上传云存储
            const fileContent = await cloud.uploadFile({
                  cloudPath: 'share/' + event.scene + '.jpeg',
                  fileContent: bufferContent.buffer
            })
            return fileContent.fileID
      }
}