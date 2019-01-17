const express = require('express')
const app = express()
const userRouter  = require('./user')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')


app.use(cookieParser())
app.use(bodyParser.json())
// 使用中间件
app.use('/user', userRouter)



app.listen('9090', function() {
    console.log('node server starting')
})