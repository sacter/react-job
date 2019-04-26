const express = require('express')
const bodyPaser = require('body-parser')
const cookiePaser = require('cookie-parser')
const userRouter = require('./user')

//新建app
const app = express()
//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('user login')
})

app.use(cookiePaser())
app.use(bodyPaser.json())
app.use('/user', userRouter)

server.listen(8001, () => {
    console.log('Node app start at port 8001');
})