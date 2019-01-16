const express = require("express")
// 使用Router中间件
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')


Router.get('/info', function(req, res) {
    res.json({code: 0})
})

module.exports = Router