import React, { Component } from 'react'
import imgSrc from '../../job.png'
import './logo.css'

class Logo extends Component {
    render() {
        return (
            <div className="img_container">
                <img src={imgSrc} alt="error"/>
            </div>
        )
    }
}

export default Logo