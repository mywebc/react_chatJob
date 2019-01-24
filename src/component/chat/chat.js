import React from 'react'
import io from 'socket.io-client'
import { List, InputItem } from 'antd-mobile'

const socket = io("ws://localhost:9090")

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    componentDidMount() {
    }
    handleSubmit() {
        // 向后台发送事件
        socket.emit('sendMsg', {text: this.state.text})
        // 清空
        this.setState({text: ''})
    }
    render() {
        return (
            <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder="please input"
                        value={this.state.text}
                        onChange={v => {
                            this.setState({
                                text: v
                            })
                        }}
                        extra={<span onClick={() => this.handleSubmit()}>发送</span>}
                    />
                </List>
            </div>
        )
    }
}

export default Chat 