const express = require('express')
const mongoose = require('mongoose')

//链接mongo 并且使用imooc集合
const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
    console.log('mongo connect success')
})
// 类似于mysql的表 mongo里有文档、字段的概念
const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: Number, require: true}
}))
//新增数据
// User.create({
//     user: 'lee',
//     age: 27
// }, (err, doc) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(doc)
//     }
// })npm
//删除数据
// User.remove({age: 23}, (err, doc) => {
//     console.log(doc)
// })
//更新数据
// User.update({'user': 'lee'}, {'$set': {age: 123}}, (err, doc) => {
//     if (!err) {
//         console.log(doc)
//     }
// })

//新建app
const app = express()

app.get('/', (req, res) => {
    res.send('<h2>Hello Express</h2>')
})

app.get('/data', (req, res) => {
    //查找数据
    // User.find({'user': 'scater'}, (err, doc) => {
    //     res.json(doc)
    // })
    User.findOne({'user': 'scater'}, (err, doc) => {
        res.json(doc)
    })
})

app.listen(8001, () => {
    console.log('Node app start at port 8001');
})