const mongoose = require('mongoose')
//链接mongo 并且使用imooc集合
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat'
mongoose.connect(DB_URL)

const models = {
  user: {
    'user': {'type': String, 'require': true},
    'pwd': {'type': String, 'require': true},
    'type': {'type': String, 'require': true},
    //头像
    'avatar': {'type': String},
    //个人简介或者职位简介
    'desc': {'type': String},
    //职位名
    'title': {'type': String},
    //如果boss,还有公司和提供薪资
    'company': {'type': String},
    'money': {'type': String}
  },
  chat: {
    'chatid': {'type': String, 'require': true},
    'from': {'type': String, 'require': true},
    'to': {'type': String, 'require': true},
    'read': {'type': Boolean, 'default': false},
    'content': {'type': String, 'require': true, 'default': ''},
    'creat_time': {'type': Number, 'default': new Date().getTime()},
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel (name) {
    return mongoose.model(name)
  }
}