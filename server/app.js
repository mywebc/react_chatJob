const express = require('express')
const app = express()
const userRouter  = require('./user')

// 使用中间件
app.use('/user', userRouter)



app.listen('9090', function() {
    console.log('node server starting')
})