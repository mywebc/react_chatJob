const express = require('express')
const app = express()
const userRouter  = require('./user')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// 将socket.io和express绑定
const server = require('http').Server(app)
const io = require('socket.io')(server)


io.on('connection', function(socket) {
    console.log('connetecd')
})



app.use(cookieParser())
app.use(bodyParser.json())
// 使用中间件
app.use('/user', userRouter)



server.listen('9090', function() {
    console.log('node server starting')
})