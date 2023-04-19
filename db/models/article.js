const mongoose = require('mongoose')
module.exports = articleSchema = new mongoose.Schema({
    title: String,
    date: String,
    content: String,
    gist: String,
    labels: Array
  })