import React, { Component } from 'react'
import { 
    NavBar,
    InputItem,
    TextareaItem,
    Button
 } from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    { update }
)
class BossInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            company: '',
            moeny: '',
            desc: '',
            avatar: ''
        }
    }
    handelChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode="dark">Boss信息</NavBar>
                <AvatarSelector selectAvatar={(text) => {
                    this.setState({
                        avatar: text
                    })
                }}/>
                <InputItem onChange={(v) => {this.handelChange('title', v)}}>招聘职位</InputItem>
                <InputItem onChange={(v) => {this.handelChange('company', v)}}>公司名称</InputItem>
                <InputItem onChange={(v) => {this.handelChange('moeny', v)}}>职位薪资</InputItem>
                <TextareaItem onChange={(v) => {this.handelChange('desc', v)}} title="职位要求" rows={3}></TextareaItem>
                <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
            </div>
        )
    }
    

}

export default BossInfo