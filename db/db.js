const mongoose = require('mongoose')
const userSchema = require('./models/user')
const articleSchema = require('./models/article')

mongoose.connect('mongodb://localhost:27017/blog')

const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema)
}

module.exports = Models
