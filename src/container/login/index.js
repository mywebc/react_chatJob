import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import {
  Button,
  WhiteSpace,
  WingBlank,
  List,
  InputItem
} from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'


@connect(
  state => state.user,
  { login }
)
class Login extends Component {
    constructor(props) {
      super(props)
      this.state = {
        user: '',
        pwd: ''
      }
      // 手动绑定便于优化（推荐），也可箭头函数
      this.goRegister = this.goRegister.bind(this)
      this.handleLogin = this.handleLogin.bind(this)
    }
    goRegister() {
      this.props.history.push('./register')
    }
    handleOnChange(key, val) {
      this.setState({
          [key]: val
      })
    }
    handleLogin() {
      this.props.login(this.state)
    }
    render() {
        return (
            <div>
              {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <WingBlank>
                  <List>
                  {this.props.msg ? <p className="err_register">{this.props.msg}</p> : null}
                    <InputItem
                      onChange={(v) => {this.handleOnChange('user', v)}}
                    >用户</InputItem>
                    <WhiteSpace/>
                    <InputItem
                      onChange={(v) => {this.handleOnChange('pwd', v)}}
                    >密码</InputItem>
                  </List>
                  <WhiteSpace/>
                  <Button onClick={this.handleLogin} type="primary">登录</Button>
                  <WhiteSpace/>
                  <Button type="primary" onClick={this.goRegister}>注册</Button>
                </WingBlank>
            </div>
        ) 
    }
}

export default Login