const express = require('express')
const userRouter = require('./user')

//新建app
const app = express()
app.use('/user', userRouter)

app.listen(8001, () => {
    console.log('Node app start at port 8001');
})