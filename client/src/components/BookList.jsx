import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import axios from 'axios'

const Book = props => (
    <tr>
      <td>{props.book.owner}</td>
      <td>{props.book.title}</td>
      <td>{props.book.author}</td>
      <td>{props.book.isbn}</td>
      <td>{props.book.hasCopy}</td>
      <td>
        <Link to={"/edit/"+props.book._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBook(props.book._id) }}>delete</a>
      </td>
    </tr>
  )
export default class BookList extends Component {
    constructor(props) {
        super(props)

        this.deleteBook = this.deleteBook.bind(this)

        this.state = {
            books: [],
            error: '',
            message: ''
        }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/books/')
        .then(res => {
            if(!res.data.msg){
                this.setState({
                    books: res.data,
                    message: res.data.message
                })
            } else {
                this.setState({
                    error: res.data.msg
                })
            }

        })
        .catch(error => {
            this.setState({
                error: error
            })
        })
    }

    deleteBook(id) {
        axios.delete('http://localhost:5000/books/' + id)
        .then(res => {
            if(!res.data.msg){
                this.setState({
                    books: this.state.books.filter(book => book._id !== id),
                    message: res.data.message
                })
            } else {
                this.setState({
                    error: res.data.msg
                })
            }
        })
        

    }

    bookList() {
        return this.state.books.map(thisBook => {
            return <Book book={thisBook} deleteBook={this.deleteBook} key={thisBook._id} />
        })
    }

    render() {
        return (
            <div className="p-5">
                {
                    this.state.error
                    && (<Alert key='alert' variant='warning'>{this.state.error}</Alert>)
                }
                {
                    this.state.message
                    && (<Alert key='success' variant='success'>{this.state.message}</Alert>)
                }
                <h3>Book Shelf</h3>
                <table className="table">
                    <thead className="thread-light">
                        <tr>
                            <th>Username</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN#</th>
                            <th>I have a copy of this book</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.bookList() }
                    </tbody>

                </table>
            </div>
        )
    }
}
