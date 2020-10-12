import React from 'react'

export default class ErrorMsg extends React.Component {
    render() {
        return <h5 id="errorMsg" style={{color: "red"}}>{this.props.text}</h5>
    }
}