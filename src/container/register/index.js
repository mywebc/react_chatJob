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

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'genius'
        }
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                <Logo />
                <List>
                    <InputItem>用户名</InputItem>
                    <InputItem>密码</InputItem>
                    <InputItem>确认密码</InputItem>
                    <RadioItem checked={this.state.type === 'genius'} onChange={() => this.onChange()}>
                    牛人
                    </RadioItem>
                    <RadioItem checked={this.state.type === 'boss'} onChange={() => this.onChange()}>
                    Boss
                    </RadioItem>
                </List>
                <WhiteSpace/>
                <Button type="primary" >注册</Button>
            </div>
        )
    }
}

export default Register