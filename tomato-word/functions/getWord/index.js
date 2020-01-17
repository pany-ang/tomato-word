// 引入库
const cloud = require('wx-server-sdk')
// 初始化
cloud.init()

// 调用数据库
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 获取集合长度
  const countResult = await db.collection('word').count()
  const total = countResult.total
  // 获取今日待复习的单词
  let nowTime = +new Date()
  const _ = db.command // 查询指令
  let res = await db.collection('word').where({
    _openid: wxContext.OPENID,
    nextTime: _.lt(nowTime) // 小于当前时间表示该单词应该复习了
  }).get()

  return {
    event,
    openid: wxContext.OPENID,
    total,
    wordReviewList: res.data
  }
}