import React, { Component } from 'react'
import {
    Grid,
    List
} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const imgList = ['boy', 'bull', 'chick', 'crab', 'girl', 'hedgehog', 'hippopotamus', 'koala', 'lemur', 'man', 'pig', 'tiger', 'whale', 'woman', 'zebra']
                    .map(v => ({
                        icon: require(`../img/${v}.png`),
                        text: v
                    }))
        const GridText = this.state.icon ? 
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span>已选择头像</span>
                                <img src={this.state.icon} alt="error"/>
                            </div> : <div>请选择头像</div>
        return (
            <div>
                <List renderHeader={GridText}>
                     <Grid 
                        data={imgList} 
                        columnNum={5}
                        onClick={ele => {
                            this.setState(ele)
                            console.log(this.state)
                            // 向外发送事件
                            this.props.selectAvatar(ele.text)
                        }}
                    />
                </List>
                
            </div>
        )
    }
}
AvatarSelector.PropTypes = {
    selectAvatar: PropTypes.func.isRequired
}
export default AvatarSelector
