const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/user', function (req, res) {
  res.send('Hello World ji')
})
app.get('/profile', function (req, res) {
  res.send('Hello World ji')
})

app.listen(3000);