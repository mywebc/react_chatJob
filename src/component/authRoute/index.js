import React, { Component } from "react"
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import { loadData } from '../../redux/user.redux'  
import { connect } from 'react-redux'

@withRouter
@connect (
    null,
    { loadData }  
)
class AuthRoute extends Component {
    //认证路由组件
    componentDidMount() {
        // 获取当前路由
        // console.log(this.props.history)
        const pathArr = ['/login', '/register']
        const currentPath = this.props.history.location.pathname
        if (pathArr.indexOf(currentPath) !== -1 ) {
            return null
        }
        // 除了登录注册页面外, 请求用户信息
        axios.get('/user/info').then((res) => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    // 登录验证通过
                    this.props.loadData(res.data.data)
                } else {
                }
            }
        })
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default AuthRoute