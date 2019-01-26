const express = require('express')
const app = express()
const userRouter = require('./user')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// 将socket.io和express绑定
const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./model')
const Chat = model.getModel('chat')


io.on('connection', function (socket) {
    console.log('connetecd')
    // 接受前台数据
    socket.on('sendMsg', function (data) {
        const { from, to, msg } = data
        const chatid = [from, to].sort().join('_')
        Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
            if (!err) {
                // 广播
                io.emit('recvmsg', Object.assign({}, doc._doc))
            }
        })
    })
})



app.use(cookieParser())
app.use(bodyParser.json())
// 使用中间件
app.use('/user', userRouter)



server.listen('9090', function () {
    console.log('node server starting')
})