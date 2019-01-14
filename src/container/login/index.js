import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import {
  Button,
  WhiteSpace,
  WingBlank,
  List,
  InputItem
} from 'antd-mobile'

class Login extends Component {
    constructor(props) {
      super(props)
      // 手动绑定便于优化（推荐），也可箭头函数
      this.goRegister = this.goRegister.bind(this)
    }
    goRegister() {
      this.props.history.push('./register')
    }
    render() {
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                  <List>
                    <InputItem>用户</InputItem>
                    <WhiteSpace/>
                    <InputItem>密码</InputItem>
                  </List>
                  <WhiteSpace/>
                  <Button type="primary">登录</Button>
                  <WhiteSpace/>
                  <Button type="primary" onClick={this.goRegister}>注册</Button>
                </WingBlank>
            </div>
        ) 
    }
}

export default Login