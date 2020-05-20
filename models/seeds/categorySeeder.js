const mongoose = require('mongoose')
const Category = require('../category')
const categoryList = require('../seeds/category.json')
mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  categoryList.results.forEach((category) => {
    Category.create({
      category: category.category
    })
  })
  console.log('done')
})
