import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

export default class CreateBook extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            title: '',
            author: '',
            isbn: '',
            hasCopy: '',
            reviews: '',
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
        const book = {
            title: this.state.title,
            author: this.state.author,
            isbn: this.state.isbn,
            hasCopy: this.state.hasCopy,
            reviews: this.state.reviews
        }
        console.log(book)
    }
    render() {
        return (
            <div className="container p-5">
                {
                    this.state.error
                    && (<Alert key='alert' variant='warning'>{this.state.error}</Alert>)
                }
                {
                    this.state.message
                    && (<Alert key='success' variant='success'>{this.state.message}</Alert>)
                }
                <h3>Add a new Book</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                       <label htmlFor="title">Title</label>
                       <input 
                       type="text"
                       required
                       className="form-control"
                       name="title"
                       value={this.state.title}
                       onChange={this.onChange} />
                   </div>
                   <div className="form-group">
                       <label htmlFor="author">Author</label>
                       <input 
                       type="text"
                       required
                       className="form-control"
                       name="author"
                       value={this.state.author}
                       onChange={this.onChange} />
                   </div>
                   <div className="form-group">
                       <label htmlFor="isbn">ISBN#</label>
                       <input 
                       type="text"
                       required
                       className="form-control"
                       name="isbn"
                       value={this.state.isbn}
                       onChange={this.onChange} />
                   </div>
                   <div className="form-group">
                       <label for="reviews">Brief Reviews</label>
                        <textarea 
                        rows="3"
                        id="reviews"
                        name="reviews"
                        className="form-control"
                        placeholder="How do you feel about this book?"
                        value={this.state.value}
                        onChange={this.onChange}
                        ></textarea>
                   </div>
                   <div className="form-group">
                       <label className="pr-2">I have a copy of this book. </label>
                       <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="hasCopy" value="Yes" onChange={this.onChange}/>
                            <label class="form-check-label" for="inlineRadio2">Yes</label>
                       </div>
                       <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="hasCopy" value="No" onChange={this.onChange} />
                            <label class="form-check-label" for="inlineRadio2">No</label>
                        </div>
                   </div>
                   <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
