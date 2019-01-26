import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getChatId } from '../../util'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'



// 监听全局
// socket.on('receiveMsg', function(data) {
//     console.log(data)
// })
@connect(
    state => state,
    { sendMsg, getMsgList, recvMsg }
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    componentDidMount() {
        // 解决多次绑定recvMsg导致发送多条重复消息bug
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    handleSubmit() {
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({ from, to, msg })
        this.setState({
            text: '',
            showEmoji: false
        })
    }
    // 修复emojy轮播图bug
    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }))
        const Item = List.Item
        const users = this.props.chat.users
        const userid = this.props.match.params.user
        const user = this.props.match.params.user
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
        if (!users[userid]) {
            return null
        }
        return (
            <div id="chat-page">
                <NavBar
                    mode='dark'
                    icon={<Icon type='left' />}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from === userid ? (
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>

                    ) : (
                            <List key={v._id}>
                                <Item
                                    extra={<img alt='头像' src={avatar} />}
                                    className='chat-me'
                                >{v.content}</Item>
                            </List>

                        )
                })}
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
                            extra={<div>
                                <span
                                    role='img'
                                    aria-label='face'
                                    style={{ marginRight: 15 }}
                                    onClick={() => {
                                        this.setState({
                                            showEmoji: !this.state.showEmoji
                                        })
                                        this.fixCarousel()
                                    }}
                                >😃</span>
                                <span onClick={() => this.handleSubmit()}>发送</span>
                            </div>}
                        />
                    </List>
                    {this.state.showEmoji ? <Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el => {
                            this.setState({
                                text: this.state.text + el.text
                            })
                        }}
                    /> : null}
                </div>
            </div>
        )
    }
}

export default Chat 