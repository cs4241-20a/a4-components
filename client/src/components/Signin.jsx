import Axios from 'axios'
import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

export default class Signin extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            name: '',
            password: '',
            error: '',
            message: ''
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
          })
    }

    handleSubmit(e) {
        e.preventDefault()

        const user = { 
            name: this.state.name, 
            password: this.state.password
        }
        Axios.post('/users/signin', user)
        .then(res => {
            if(!res.data.msg){
                this.setState({
                    message: res.data.message
                })
            }
            else {
                this.setState({
                    error: res.data.msg
                })
            }

        })
        .catch(e => {
            console.log(e)
        })
    }

    render() {
        const buttonStyle = {
            color: 'white',
            backgroundColor: 'black',
            position: 'relative'
        }


        return (
            <div className='container p-5'>
                {
                    this.state.error
                    && (<Alert key='alert' variant='warning'>{this.state.error}</Alert>)
                }
                {
                    this.state.message
                    && (<Alert key='success' variant='success'>{this.state.message}</Alert>)
                }
                <h3>Sign In</h3>
               <form onSubmit={this.handleSubmit}>
                   <div className="form-group">
                       <label htmlFor="name">Name</label>
                       <input 
                       type="text"
                       required
                       className="form-control"
                       name="name"
                       value={this.state.name}
                       onChange={this.onChange} />
                   </div>
                   <div className="form-group">
                       <label htmlFor="password">Password</label>
                       <input 
                       type="password"
                       required
                       className="form-control"
                       name="password"
                       value={this.state.password}
                       onChange={this.onChange} />
                   </div>
                   <button type="submit" className="btn btn-dark btn-block">Sign in</button>
               </form>
            </div>
        )
    }
}