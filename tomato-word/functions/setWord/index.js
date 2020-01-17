// 引入库
const cloud = require('wx-server-sdk')
// 初始化
cloud.init()

// 调用数据库
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  // 查询单词是否已经存在
  let res = await db.collection('word').where({
    _openid: wxContext.OPENID,
    word: {
      word: event.params.word
    }
  }).get()
  
  // 添加单词
  if (res.data.length === 0){
    // 计算单词的复习时间
    let schedule = event.params.sm2Response.schedule
    let nowTime = +new Date()
    let nextTime = nowTime + schedule * 24 * 60 * 60 * 1000;
    // 如果不存在就添加
    await db.collection('word').add({
      data: {
        _openid: wxContext.OPENID,
        word: event.params,
        nextTime,
      }
    })
  } else {
    // 如果存在就什么都不做
    // 单词状态的更新放在复习模式中
  }

  return {
    event,
    openid: wxContext.OPENID
  }
}