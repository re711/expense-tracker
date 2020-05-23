const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// 進入新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 送出新增表單
router.post('/', (req, res) => {
  const { name, category, date, amount } = req.body
  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 進入修改頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

// 修改表單
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, category, date, amount } = req.body
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.category = category
      record.date = date
      record.amount = amount
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

// 篩選功能
router.get('/:id/filter', (req, res) => {
  const id = req.params.id
  let totalAmount = 0
  Record.find({ category: id })
    .lean()
    .then(items => {
      items.forEach(item => {
        totalAmount += item.amount
      })
      return items
    })
    .then(records => res.render('index', { records, totalAmount, id }))
    .catch(error => console.log(error))
})

module.exports = router
