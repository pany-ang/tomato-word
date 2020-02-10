// 引入库
const cloud = require('wx-server-sdk')
// 初始化
cloud.init()

// 调用数据库
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 获取集合总长度
  // const countResult = await db.collection('word').count()
  // const total = countResult.total

  // 获取今日待复习的单词
  let nowTime = +new Date()
  const _ = db.command // 查询指令
  let res = await db.collection('word').where({
    _openid: wxContext.OPENID,
    nextTime: _.lt(nowTime), // 小于当前时间表示该单词应该复习了
    word: {
      sm2Response: {
        isRepeatAgain: true
      }
    }
  }).get()

  // 获取待复习单词总数
  let res2 = await db.collection('word').where({
    _openid: wxContext.OPENID,
    word: {
      sm2Response: {
        isRepeatAgain: true
      }
    }
  }).get()
  const total = res2.data.length
  
  return {
    event,
    openid: wxContext.OPENID,
    total,
    wordReviewList: res.data
  }
}