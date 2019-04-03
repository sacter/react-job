const express = require('express')
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