import React, { Component } from 'react'

export class StoreItem extends Component {
    render() {
        return (
            <div className = "has-text-centered" id = {this.props.id}>
                <img 
                src = {this.props.imgSrc}
                alt = {this.props.imgAlt}>
                </img>
                <p>
                    {this.props.name}
                </p>
                <p>
                    {`$${this.props.price}`}
                </p>
            </div>
        )
    }
}

export default StoreItem
