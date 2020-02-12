// 引入库
const cloud = require('wx-server-sdk')
// 初始化
cloud.init()

// 调用数据库
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 获取四级单词
  let wordType0 = await db.collection('word').where({
    _openid: wxContext.OPENID,
    wordType: '0',
  }).get()
  // 获取六级单词
  let wordType1 = await db.collection('word').where({
    _openid: wxContext.OPENID,
    wordType: '1',
  }).get()
  // 获取考研单词
  let wordType2 = await db.collection('word').where({
    _openid: wxContext.OPENID,
    wordType: '2',
  }).get()
  // 获取专八单词
  let wordType3 = await db.collection('word').where({
    _openid: wxContext.OPENID,
    wordType: '3',
  }).get()
  // 获取软件单词
  let wordType4 = await db.collection('word').where({
    _openid: wxContext.OPENID,
    wordType: '4',
  }).get()

  // 获取评分为0的单词
  let wordScore0 = await db.collection('word').where({
    _openid: wxContext.OPENID,
    wordScore: 0
  }).get()
  // 获取评分为1的单词
  let wordScore1 = await db.collection('word').where({
    _openid: wxContext.OPENID,
    wordScore: 1
  }).get()
  // 获取评分为2的单词
  let wordScore2 = await db.collection('word').where({
    _openid: wxContext.OPENID,
    wordScore: 2
  }).get()
  // 获取评分为3的单词
  let wordScore3 = await db.collection('word').where({
    _openid: wxContext.OPENID,
    wordScore: 3
  }).get()
  // 获取评分为4的单词
  let wordScore4 = await db.collection('word').where({
    _openid: wxContext.OPENID,
    wordScore: 4
  }).get()
  // 获取评分为5的单词
  let wordScore5 = await db.collection('word').where({
    _openid: wxContext.OPENID,
    wordScore: 5
  }).get()

  return {
    event,
    openid: wxContext.OPENID,
    wordType: {
      wordType0Length: wordType0.data.length,
      wordType1Length: wordType1.data.length,
      wordType2Length: wordType2.data.length,
      wordType3Length: wordType3.data.length,
      wordType4Length: wordType4.data.length,
    },
    wordScore: {
      wordScore0Length: wordScore0.data.length,
      wordScore1Length: wordScore1.data.length,
      wordScore2Length: wordScore2.data.length,
      wordScore3Length: wordScore3.data.length,
      wordScore4Length: wordScore4.data.length,
      wordScore5Length: wordScore5.data.length,
    }
  }
}