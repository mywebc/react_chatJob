const express = require('express')
const mongoose = require('mongoose')
// 连接数据库，并且创建react-job这个集合
const db_URL = 'mongodb://127.0.0.1:27017/react_job'
mongoose.connect(db_URL)
mongoose.connection.on('connected', function() {
    console.log('mongo connect success')
})

// 新建一个use集合
const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: Number, require: true}
}))
// 创建
User.create({
    user: 'frank',
    age: 20
}, function(err, doc) {
    // 插入成功之后的回调，第一个参数为err
    if(!err) {
        console.log(doc)
    } else {
        console.log(err)
    }
})

const app = express()

app.get('/', function(req, res) {
    res.send('<h1>hello world1</h1>')
})
// 查询
app.get('/data', function(req, res) {
    // {}就是查询所有, findOne只查一条，且返回的不是数组而是对象
    User.find({}, function(err, doc) {
        if(!err) {
            res.json(doc)
        }
    })
})
// 删除
app.get('/delete', function(req, res) {
    User.remove({age: 25}, function(err, doc) {
        if(!err) {
            console.log('delete sucess')
        }
    })
})
// 更新
app.get('/update', function(req, res) {
    User.update({user: 'frank'}, {'$set': {user: 'frankUpdate'}}, function(err, doc) {
        if(!err) {
            console.log('update sucess')
        }
    })
})
app.listen('9090', function() {
    console.log('node server starting')
})