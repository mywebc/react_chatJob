const mongoose = require('mongoose')

// 连接数据库，并且创建react-job这个集合
const db_URL = 'mongodb://127.0.0.1:27017/react_job'
mongoose.connect(db_URL)
mongoose.connection.on('connected', function() {
    console.log('mongo connect success')
})