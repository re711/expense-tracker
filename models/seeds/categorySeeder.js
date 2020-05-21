const mongoose = require('mongoose')
const Record = require('../record')
mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  const promises = []
  promises.push(Record.create(
    {
      categoryName: '家居物業',
      icon: '<i class="fas fa-home"></i>'
    },
    {
      categoryName: '交通出行',
      icon: '<i class="fas fa-shuttle-van"></i>'
    },
    {
      categoryName: '休閒娛樂',
      icon: '<i class="fas fa-grin-beam"></i>'
    },
    {
      categoryName: '餐飲食品',
      icon: '<i class="fas fa-utensils"></i>'
    },
    {
      categoryName: '其他',
      icon: '<i class="fas fa-pen"></i>'
    }
  ))
  Promise.all(promises).then(() => {
    console.log('done')
    db.close()
  })
})
