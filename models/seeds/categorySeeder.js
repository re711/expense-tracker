const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
  const promises = []
  promises.push(Category.create(
    {
      name: '家居物業'
    },
    {
      name: '交通出行'
    },
    {
      name: '休閒娛樂'
    },
    {
      name: '餐飲食品'
    },
    {
      name: '其他'
    }
  ))
  Promise.all(promises).then(() => {
    console.log('category done')
    db.close()
  })
})
