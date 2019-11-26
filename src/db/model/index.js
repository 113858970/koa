/**
 * @description 数据模型入口文件
 * @author ad
 */

const User = require('./User')
const Blog = require('./Blog')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

//User.

module.exports = {
    User,
    Blog
}
