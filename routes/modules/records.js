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
  const userId = req.user._id
  const { name, category, date, amount, merchant } = req.body
  const errors = []
  if (!name || !category || !date || !amount) {
    errors.push({ message: '除商家外、其他欄位必填！' })
  }
  if (errors.length) {
    return res.render('new', {
      errors,
      name,
      category,
      date,
      amount,
      merchant
    })
  }
  return Record.create({
    userId,
    name,
    category,
    date,
    amount,
    merchant
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 進入修改頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      record.date = moment(record.date).format('YYYY-MM-DD')
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})

// 修改表單
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, date, amount, merchant } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.category = category
      record.date = date
      record.amount = amount
      record.merchant = merchant
      record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除功能
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 篩選類別功能
router.get('/:id/filter', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  let totalAmount = 0
  Record.find({ category: _id, userId })
    .lean()
    .then(items => {
      items.forEach(item => {
        totalAmount += item.amount
        item.date = moment(item.date).format('YYYY-MM-DD')
      })
      return items
    })
    .then(records => res.render('index', { records, totalAmount, _id }))
    .catch(error => console.log(error))
})

// 篩選月份功能
router.get('/month', (req, res) => {
  const userId = req.user._id
  const filter = req.query.filter
  const amountFilter = Record.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: { $month: '$date' },
        amount: { $sum: '$amount' }
      }
    },
    { $match: { _id: Number(filter) } }
  ]).exec()
  const monthFilter = Record.aggregate([
    { $match: { userId } },
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
