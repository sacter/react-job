const express = require('express')
const bodyPaser = require('body-parser')
const cookiePaser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const userRouter = require('./user')

//新建app
const app = express()
//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('user login')
  socket.on('sendmsg', data => {
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content: msg}, (err, doc) => {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
    // console.log(data)
    // io.emit('recvmsg', data)
  })
})

app.use(cookiePaser())
app.use(bodyPaser.json())
app.use('/user', userRouter)

server.listen(8001, () => {
    console.log('Node app start at port 8001');
})