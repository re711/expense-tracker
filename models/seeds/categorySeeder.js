const mongoose = require('mongoose')
const Category = require('../category')
mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

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
