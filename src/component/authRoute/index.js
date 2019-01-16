import React, { Component } from "react"
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
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
        // 请求用户信息
        axios.get('/user/info').then((res) => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    // 登录验证通过
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