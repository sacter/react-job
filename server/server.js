const express = require('express')
const mongoose = require('mongoose')

//链接mongo
const DB_URL = 'mongodb://127.0.0.1:27017'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
    console.log('mongo connect success')
})

//新建app
const app = express()

app.get('/', (req, res) => {
    res.send('<h2>Hello Express</h2>')
})

app.get('/data', (req, res) => {
    res.json({name: 'scater', job: 'IT321'})
})

app.listen(8001, () => {
    console.log('Node app start at port 8001');
})