const express = require("express")
// 使用Router中间件
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')

Router.post('/register', function(req, res) {
    console.log(req.body) 
    const { user, pwd, type } = req.body
    User.findOne({user}, function(err, doc) {
        if(doc) {
            return res.json({code: 1, msg: '用户名已存在'})
        }
        // 插入数据库
        User.create({ user, type, pwd: utils.md5(pwd)}, function(err, doc) {
            if(err) {
                return res.json({code: 1, msg: '服务器出错'})
            }
            return res.json({code: 0})
        })
    })
})
Router.get('/info', function(req, res) {
    res.json({code: 0})
})

module.exports = Router