const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')

const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', (req, res) => {
  // User.remove({}, (err, doc) => {})
  User.find({}, (err, doc) => {
    return res.json(doc)
  })
})
Router.post('/login', (req, res) => {
  const {user, pwd} = req.body;
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或密码错误'})
    }
    res.cookie('userid', doc._id) // 存储cookie
    return res.json({code: 0, data: doc})
  })
})
Router.post('/register', (req, res) => {
  const {user, pwd, type} = req.body;
  User.findOne({user}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: '用户名已存在'})
    }
    User.create({user, type, pwd: md5Pwd(pwd)}, (err, doc) => {
      if (err) {
        return res.json({code: 1, msg: '后端出错'})
      }
      return res.json({code: 0})
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