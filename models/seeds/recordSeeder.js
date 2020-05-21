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
      name: '早餐',
      category: '餐飲食品',
      date: '2019/04/13',
      amount: 75,
      icon: '<i class="fas fa-utensils"></i>'
    },
    {
      name: '計程車',
      category: '交通出行',
      date: '2019/04/13',
      amount: 250,
      icon: '<i class="fas fa-shuttle-van"></i>'
    },
    {
      name: '唱歌KTV',
      category: '休閒娛樂',
      date: '2019/04/13',
      amount: 800,
      icon: '<i class="fas fa-grin-beam"></i>'
    },
    {
      name: '朋友聚餐',
      category: '餐飲食品',
      date: '2019/04/14',
      amount: 300,
      icon: '<i class="fas fa-utensils"></i>'
    },
    {
      name: '租金',
      category: '家居物業',
      date: '2019/04/20',
      amount: 12000,
      icon: '<i class="fas fa-home"></i>'
    },
    {
      name: '捷運',
      category: '交通出行',
      date: '2019/05/01',
      amount: 130,
      icon: '<i class="fas fa-shuttle-van"></i>'
    }
  ))
  Promise.all(promises).then(() => {
    console.log('done')
    db.close()
  })
})
