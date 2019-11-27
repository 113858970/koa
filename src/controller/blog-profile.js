
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    createBlogFailInfo
} = require('../model/ErrorInfo')
const { getBlogListByUser } = require('../services/blog')
const { PAGE_SIZE } = require('../conf/constant')

async function getProfileBlogList(userName, pageIndex = 0){
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize:PAGE_SIZE
  })
  const blogList = result.blogList

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getProfileBlogList
}
