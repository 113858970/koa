//时间相关

const { format } = require('date-fns')

function timeFormat(str){
  return format(new Date(str),'MM.dd HH:mm')
}

module.exports = {
  timeFormat
}
