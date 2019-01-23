import React, { Component } from 'react'
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard'

@connect(
    state => state.chatuser,
    { getUserList }
)
class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    // 在这里请求数据   
    componentDidMount() {
        this.props.getUserList('genius')
    }
    render() {
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}

export default Boss