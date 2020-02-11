// 引入库
const cloud = require('wx-server-sdk')
// 初始化
cloud.init()

// 调用数据库
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  // 添加反馈
  await db.collection('feedback').add({
    data: {
      _openid: wxContext.OPENID,
      detail: event.detail,
      contactInfo: event.contactInfo,
      time: event.time,
    }
  })

  return {
    event,
    openid: wxContext.OPENID
  }
}