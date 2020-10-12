import React from 'react'
import { Container } from 'reactstrap'

export default class Subtitle extends React.Component {
    render() {
        return (
            <Container>
                <h5>{ this.props.text }</h5>
            </Container>
        )
    }
}
