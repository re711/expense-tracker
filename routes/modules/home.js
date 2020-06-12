const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')

// 首頁
router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    // 金額加總
    .then(items => {
      items.forEach(item => {
        totalAmount += item.amount
        item.date = moment(item.date).format('YYYY-MM-DD')
      })
      return items
    })
    .then(records => res.render('index', { records, totalAmount }))
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router
