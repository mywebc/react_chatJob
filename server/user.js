const express = require("express")
// 使用Router中间件
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')

Router.get('/list', function(req, res) {
    // User.remove({}, function(err, doc) {})
    const { type } = req.query
    User.find({type}, function(err, doc){
        if(doc) {
            return res.json({code: 0, data: doc})
        }
    })
})
// 注册
Router.post('/register', function(req, res) {
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
                res.cookie('userid', doc._id)
                return res.json({code: 0, data: doc})
            }

        } else {
            return res.json({code: 1, msg: '该用户不存在！'})
        }
    })
})
Router.get('/info', function(req, res) {
    // 写cookie res.cookie 读cookie req.cookie
    const { userid } = req.cookies
    if (!userid) {
        res.json({code: 1})
    }
    // 如果有cookie
    User.findOne({_id: userid}, function(err, doc) {
        if(err) {
            return res.json({code: 1, msg: '数据库出错'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }

    })
})
// Boss 页面保存
Router.post('/update', function(req, res) {
    const { userid } = req.cookies
    if (!userid) {
        return res.json({code: 1})
    }
    // 查找并且更新
    const body = req.body
    User.findByIdAndUpdate(userid, body, function(err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({code: 0, data})
    })
})



Router.get('/getmsglist', function (req, res) {
    const user = req.cookies.userid
  
    User.find({}, function (err, userdoc) {
      if (!err) {
        let users = {}
        userdoc.forEach(v => {
          users[v._id] = {name: v.user, avatar: v.avatar}
        })
        Chat.find({'$or': [{from: user}, {to: user}]}, function (err, doc) {
          if (!err) {
            return res.json({code: 0, msgs: doc, users: users})
          }
        })
      }
    })
  })

  Router.post('/readmsg', function (req, res) {
    const userid = req.cookies.userid
    const {from} = req.body
    Chat.update(
      {from, to: userid},
      {'$set': {read: true}},
      {'multi': true},
      function (err, doc) {
        if (!err) {
          return res.json({code: 0, num: doc.nModified})
        }
        return res.json({code: 1, msg: '修改失败'})
      }
    )
  })
module.exports = Router