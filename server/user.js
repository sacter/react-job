const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')

const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', (req, res) => {
  // User.remove({}, (err, doc) => {})
  const { type } = req.query
  User.find({type}, (err, doc) => {
    return res.json({code: 0, data: doc})
  })
})
Router.get('/getmsglist', (req, res) => { // 获取聊天信息
  const user = req.cookies.user;
  Chat.find({}, (err, doc) => {
    if (!err) {
      return res.json({code: 0, msg: doc})
    }
  })
})
Router.post('/update', (req, res) => {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.json({code: 1})
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})
Router.post('/login', (req, res) => { // 登录接口
  const {user, pwd} = req.body;
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或密码错误'})
    }
    res.cookie('userid', doc._id) // 存储cookie
    return res.json({code: 0, data: doc})
  })
})
Router.post('/register', (req, res) => { // 注册接口
  const {user, pwd, type} = req.body;
  User.findOne({user}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: '用户名已存在'})
    }

    const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    userModel.save((err, doc) => {
      if (err) {
        return res.json({code: 1, msg: '后端出错'})
      }
      const {user, type, _id} = doc
      res.cookie('userid', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
  })
})

Router.get('/info',  (req, res) => {
  //用户有没有cookie
  const {userid} = req.cookies; // 获取用户请求cookie
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: '后端出错'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

/**
 * 对用户密码加密加盐
 * @param {*} pwd 
 */
function md5Pwd (pwd) {
  const salt = 'scater_react_job_18923@#4545_-~~~34!@#$%dd';
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router