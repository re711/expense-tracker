const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record')

const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    // 金額加總
    .then(items => {
      items.forEach(item => {
        totalAmount += item.amount
      })
      return items
    })
    .then(records => res.render('index', { records, totalAmount }))
    .catch(error => console.error(error))
})

// 選擇類別圖示
Handlebars.registerHelper('categoryIcon', function (categoryName, styleIcon, options) {
  if (categoryName === styleIcon) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.post('/records', (req, res) => {
  const { name, category, date, amount } = req.body
  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
