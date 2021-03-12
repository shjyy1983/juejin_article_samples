/*
 * @Author: SHEN
 * @Date: 2021-03-11 15:55:16
 * @Last Modified by: SHEN
 * @Last Modified time: 2021-03-11 16:07:14
 */
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const express = require('express')

var app = express()
app.use(cors())

app.get('/api/demo1', function (req, res) {
  const reqPath = req.path.replace(/\/api/ig, '')
  const filePath = path.resolve(__dirname, `./mocks${reqPath}.js`)
  if (!fs.existsSync(filePath)) {
    res.send('文件不存在')
    return
  }

  let data = require(filePath)
  res.send(data)
})

var server = app.listen(9001, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})
