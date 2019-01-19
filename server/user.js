const express = require("express")
// 使用Router中间件
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')

Router.get('/list', function(req, res) {
    // User.remove({}, function(err, doc) {})
    User.find({}, function(err, doc){
        if(doc) {
            return res.json(doc)
        }
    })
})
// 注册
Router.post('/register', function(req, res) {
    console.log(req.body) 
    const { user, pwd, type } = req.body
    User.findOne({user}, function(err, doc) {
        if(doc) {
            return res.json({code: 1, msg: '用户名已存在'})
        }
        // 插入数据库
        const userModel = new User({user, type, pwd: utils.md5(pwd)}) 
        userModel.save(function(err, doc) {
            if(err) {
                return res.json({code: 1, msg: '数据库出错'})
            }
            const { user, type, _id } = doc
            res.cookie('userid', _id)
            res.json({code: 0, data: {user, type, _id}})
        })
    })
})
// 登录
Router.post('/login', function(req, res) {
    const { user, pwd } = req.body
    User.findOne({user}, function(err, doc) {
        if(doc) {
            console.log(doc)
            const pwdServer = doc.pwd
            const pwdClient = utils.md5(pwd)
            if (pwdServer !== pwdClient) {
                return res.json({code: 1, msg: '密码错误！'})
            } else {
                // 登录成功设置cookie
                res.cookie('userId', doc._id)
                return res.json({code: 0, data: doc})
            }

        } else {
            return res.json({code: 1, msg: '该用户不存在！'})
        }
    })
})
Router.get('/info', function(req, res) {
    // 写cookie res.cookie 读cookie req.cookie
    console.log(req)
    const { userId } = req.cookies
    if (!userId) {
        res.json({code: 1})
    }
    // 如果有cookie
    User.findOne({_id: userId}, function(err, doc) {
        if(err) {
            return res.json({code: 1, msg: '数据库出错'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }

    })
})

module.exports = Router