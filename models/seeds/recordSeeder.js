const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  const promises = []
  promises.push(Record.create(
    {
      name: '早餐',
      category: '餐飲食品',
      date: '2019/04/13',
      amount: 75,
      merchant: '早餐店'
    },
    {
      name: '計程車',
      category: '交通出行',
      date: '2019/04/13',
      amount: 250,
      merchant: ''
    },
    {
      name: '唱歌KTV',
      category: '休閒娛樂',
      date: '2019/04/13',
      amount: 800,
      merchant: '好樂迪'
    },
    {
      name: '網路購物',
      category: '其他',
      date: '2019/04/14',
      amount: 300,
      merchant: 'PCHome'
    },
    {
      name: '租金',
      category: '家居物業',
      date: '2019/04/20',
      amount: 12000,
      merchant: '房東'
    }
  ))
  Promise.all(promises).then(() => {
    console.log('record done')
    db.close()
  })
})
