import React from 'react'
import io from 'socket.io-client'

class Chat extends React.Component {
    componentDidMount() {
        const socket = io("ws://localhost:9090")
    }
    render() {
        return (
            <div>chat with {this.props.match.params.user}</div>
        )
    }
}

export default Chat 