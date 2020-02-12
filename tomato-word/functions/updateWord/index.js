// 引入库
const cloud = require('wx-server-sdk')
// 初始化
cloud.init()

// 调用数据库
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  // 更新单词
  // 计算单词的复习时间
  let schedule = event.params.sm2Response.schedule
  let nowTime = +new Date()
  let nextTime = nowTime + schedule * 24 * 60 * 60 * 1000;
  await db.collection('word').where({ // 先查询
      _openid: wxContext.OPENID,
      word: {
        word: event.params.word
      }
  }).update({ // 再更新
    data: {
      _openid: wxContext.OPENID,
      word: event.params,
      nextTime,
      wordScore: event.wordScore
    }
  })

  return {
    event,
    openid: wxContext.OPENID
  }
}