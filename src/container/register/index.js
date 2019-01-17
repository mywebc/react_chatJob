import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import {
    Button,
    WhiteSpace,
    WingBlank,
    List,
    InputItem,
    Radio
} from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    { register }
)
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
        this.handleRegister = this.handleRegister.bind(this)
    }   
    handleOnChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    handleRegister() {
        this.props.register(this.state)
        console.log(this.state)
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo />
                <List>
                    {this.props.msg ? <p className="err_register">{this.props.msg}</p> : null}
                    <InputItem
                        onChange={(v) => this.handleOnChange('user', v)}
                    >用户名</InputItem>
                    <InputItem
                        type='password'
                        onChange={(v) => this.handleOnChange('pwd', v)}
                    >密码</InputItem>
                    <InputItem
                        type='password'
                        onChange={(v) => this.handleOnChange('repeatpwd', v)}
                    >确认密码</InputItem>
                    <RadioItem checked={this.state.type === 'genius'} onChange={() => this.handleOnChange('type', 'genius')}>
                    牛人
                    </RadioItem>
                    <RadioItem checked={this.state.type === 'boss'} onChange={() => this.handleOnChange('type', 'boss')}>
                    Boss
                    </RadioItem>
                </List>
                <WhiteSpace/>
                <Button type="primary" onClick={this.handleRegister}>注册</Button>
            </div>
        )
    }
}

export default Register