const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')
const path = require('path')

const MIX_SIZE = 1024*1024*1024
const DIST_PATH = path.join(__dirname,'..','..','uploadFiles')

//是否需要创建目录
fse.pathExists(DIST_PATH).then(exist => {
  if(!exist) {
    fse.ensureDir(DIST_PATH)
  }
})

async function saveFile({name, type, size, filePath}) {
  if(size > MIX_SIZE) {
    //删除文件
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  //移动文件
  const fileName = Date.now() + '.' + name
  const distFilePath = path.join(DIST_PATH, fileName) // 存储的位置
  await fse.move(filePath,distFilePath)

  //返回信息
  return new SuccessModel({
    url: '/' + fileName
  })

}

module.exports= {
  saveFile
}
