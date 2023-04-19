const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express()
// 导入接口路由文件
const router = require('./api/index')

app.use(cors())
app.use('/api', router);
app.use(express.static('public'));

app.listen(3000, function () {
    console.log('访问地址为 localhost:3000')
  })
  
module.exports = app;