const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// 首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  const amount = Record.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        amount: { $sum: '$amount' }
      }
    }
  ]).exec()

  const records = Record.aggregate([
    { $match: { userId } },
    {
      $project: {
        name: 1,
        category: 1,
        date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        amount: 1,
        merchant: 1
      }
    }
  ]).exec()

  Promise.all([amount, records])
    .then(([amount, records]) => {
      const totalAmount = amount[0]
      res.render('index', { totalAmount, records })
    })
    .catch((error) => console.log(error))
})

// 匯出路由模組
module.exports = router
