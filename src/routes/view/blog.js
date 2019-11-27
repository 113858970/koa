const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
//首页
router.get('/',loginRedirect, async(ctx,next) => {
  await ctx.render('index', {})
})

//个人主页
router.get('/profile',loginRedirect, async(ctx,next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName',loginRedirect, async(ctx,next) => {

  //当前登录用户的信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserINfo
  const { userName:curUserName } = ctx.params
  const isMe = myUserName === curUserName
  if(isMe){
    curUserINfo = myUserInfo
  }else{
    const existResult = await isExist(curUserName)
    if(existResult.errno !== 0){
      return
    }
    curUserINfo = existResult.data
  }

  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count} = result.data

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    },
    userData: {
      userInfo:curUserINfo,
      isMe,
    }
  })
})

module.exports = router
