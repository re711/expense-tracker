const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  },
  amount: {
    type: Number,
    required: false
  },
  totalAmount: {
    type: String,
    required: false
  },
  categoryName: {
    type: String,
    required: false
  },
  icon: {
    type: String,
    required: false
  }
})
module.exports = mongoose.model('Record', recordSchema)
