const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')

// 進入新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 送出新增表單
router.post('/', (req, res) => {
  const { name, category, date, amount, merchant } = req.body
  return Record.create({ name, category, date, amount, merchant })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 進入修改頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => {
      record.date = moment(record.date).format('YYYY-MM-DD')
      return res.render('edit', { record })
    })
    .catch(error => console.log(error))
})

// 修改表單
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, category, date, amount, merchant } = req.body
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.category = category
      record.date = date
      record.amount = amount
      record.merchant = merchant
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除功能
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 篩選類別功能
router.get('/:id/filter', (req, res) => {
  const id = req.params.id
  let totalAmount = 0
  Record.find({ category: id })
    .lean()
    .then(items => {
      items.forEach(item => {
        totalAmount += item.amount
        item.date = moment(item.date).format('YYYY-MM-DD')
      })
      return items
    })
    .then(records => res.render('index', { records, totalAmount, id }))
    .catch(error => console.log(error))
})

// 篩選月份功能
router.get('/month', (req, res) => {
  const filter = req.query.filter
  const amountFilter = Record.aggregate([
    {
      $group: {
        _id: { $month: '$date' },
        amount: { $sum: '$amount' }
      }
    },
    { $match: { _id: Number(filter) } }
  ]).exec()
  const monthFilter = Record.aggregate([
    {
      $project: {
        name: 1,
        category: 1,
        date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        month: { $month: '$date' },
        amount: 1,
        merchant: 1
      }
    },
    { $match: { month: Number(filter) } }
  ]).exec()

  if (filter) {
    Promise.all([amountFilter, monthFilter])
      .then(([amountFilter, records]) => {
        const totalAmount = amountFilter[0]
        res.render('index', { totalAmount, records, filter })
      })
      .catch(error => console.log(error))
  } else {
    Promise.all(([amountFilter, monthFilter]))
      .then(() => res.redirect('/'))
  }
})

module.exports = router
