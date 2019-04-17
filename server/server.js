const express = require('express')
const bodyPaser = require('body-parser')
const cookiePaser = require('cookie-parser')
const userRouter = require('./user')

//新建app
const app = express()
app.use(cookiePaser())
app.use(bodyPaser.json())
app.use('/user', userRouter)

app.listen(8001, () => {
    console.log('Node app start at port 8001');
})