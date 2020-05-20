const mongoose = require('mongoose')
const Record = require('../record')
const expenseList = require('../seeds/expense.json')
mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  expenseList.results.forEach((records) => {
    Record.create({
      name: records.name,
      category: records.category,
      date: records.date,
      amount: records.amount
      // totalAmount: records.totalAmount
    })
  })
  console.log('done')
})
