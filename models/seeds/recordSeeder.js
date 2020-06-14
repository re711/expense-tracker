const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Record.create(
        {
          name: '早餐',
          category: '餐飲食品',
          date: '2019/04/13',
          amount: 75,
          merchant: '早餐店',
          userId
        },
        {
          name: '計程車',
          category: '交通出行',
          date: '2019/04/13',
          amount: 250,
          merchant: '出租車',
          userId
        },
        {
          name: '唱歌KTV',
          category: '休閒娛樂',
          date: '2019/04/13',
          amount: 800,
          merchant: '好樂迪',
          userId
        },
        {
          name: '網路購物',
          category: '其他',
          date: '2019/04/14',
          amount: 300,
          merchant: 'PCHome',
          userId
        },
        {
          name: '租金',
          category: '家居物業',
          date: '2019/04/20',
          amount: 12000,
          merchant: '房東',
          userId
        }
      )
    })
    .then(() => {
      console.log('record done')
      db.close()
    })
})
