import React from 'react'
import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux' 
import { getMsgList } from '../../redux/chat.redux'

// 监听全局
// socket.on('receiveMsg', function(data) {
//     console.log(data)
// })
@connect(
    state => state,
    { getMsgList }
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    componentDidMount() {
        this.props.getMsgList()
    }
    handleSubmit() {
        // // 向后台发送事件
        // socket.emit('sendMsg', {text: this.state.text})
        // // 清空
        // this.setState({text: ''})
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