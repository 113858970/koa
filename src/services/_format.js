/**
 * @description 数据格式化
 * @author ad
 */

const { DEFAULT_PICTURE } = require('../conf/constant')
const { timeFormat } = require('../utils/dt.js')
/**
 * 用户默认头像
 * @param {Object} obj 用户对象
 */
function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
function formatUser(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        // 数组 用户列表
        return list.map(_formatUserPicture)
    }

    // 单个对象
    return _formatUserPicture(list)
}

//格式化时间函数
function _formatDBTime(obj){
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}

function formatBlog(list){
    //return (list)

    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        // 数组
        return list.map(_formatDBTime)
    }
    // 单个对象
    return _formatDBTime(list)
}

module.exports = {
    formatUser,
    formatBlog
}
