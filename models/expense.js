const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema({
  model: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Expense', expenseSchema)
