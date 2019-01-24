const mongoose = require('mongoose')

// 连接数据库，并且创建react-job这个集合
const db_URL = 'mongodb://127.0.0.1:27017/react_job_chat'
mongoose.connect(db_URL)

// 定义模型
const models = {
    user: {
        'user': { type: String, require: true },
        'pwd': { type: String, require: true },
        'type': { type: String, require: true },
        'avatar': { type: String },
        'desc': { type: String },
        'title': { type: String },
        'company': { type: String },
        'money': { type: String }
    },
    chat: {
        'chatid': {'type': String, require: true},
        'from': {'type': String, require: true},
        'to': {'type': String, require: true},
        'read': {'type': Boolean, default: false},
        'content': {'type': String, require: true, default: ''},
        'create_time': {'type': Number, default: new Date().getTime()}
    }
}

// 批量生成模型
for(let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}


mongoose.connection.on('connected', function() {
    console.log('mongo connect success')
})