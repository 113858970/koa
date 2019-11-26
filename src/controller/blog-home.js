const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    createBlogFailInfo
} = require('../model/ErrorInfo')
const { createBlog } = require('../services/blog')

async function create({userId, content, image}){
  try {
    const blog = await createBlog({userId, content, image})
    return new SuccessModel(blog)
  } catch(ex) {
    console.error(ex.message)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}
