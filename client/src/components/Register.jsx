import Axios from 'axios'
import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            name: '',
            password: '',
            password2: '',
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
        if(this.state.password !== this.state.password2) {
            this.setState({
                error: 'Passwords must match'
            })
        }
        else if(this.state.password.length < 6) {
            this.setState({
                error: 'Password should at least have 6 characters'
            })
        }
        else {
            const user = { 
                name: this.state.name, 
                password: this.state.password
            }
            Axios.post('http://localhost:5000/users/register', user)
            .then(res => {
                if(!res.data){
                    this.setState({
                        message: 'You have registered succesfully.'
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
    }

    render() {
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
                <h3>Sign Up</h3>
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
                   <div className="form-group">
                       <label htmlFor="password2">Confirm Password</label>
                       <input 
                       type="password"
                       required
                       className="form-control"
                       name="password2"
                       value={this.state.password2}
                       onChange={this.onChange} />
                   </div>
                   <button type="submit">Submit</button>
               </form>
            </div>
        )
    }
}
