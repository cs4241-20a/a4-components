import React, { Component } from 'react'
import ABCJS from 'abcjs'
export class Demo extends Component {
    test = () => {
        console.log(ABCJS)
    }
    render() {
        return (
            <div>
                <h1>Demo Song Player</h1>
                <button className="btn" onClick={this.test}>Play Song</button>
            </div>
        )
    }
}

export default Demo
