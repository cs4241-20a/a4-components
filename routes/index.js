const express = require('express')
const Book = require('../models/Book')
const router = express.Router()
const { ensureAuthenticated, forwardAuthenticated} = require('../config/auth')

router.get('/', forwardAuthenticated, (req, res) => {
  res.send('Welcome')
})

router.get('/books', ensureAuthenticated, (req, res) => {
  console.log(req.user)
})

router.route('/add').post((req, res) => {
    const { title, author, isbn, hasCopy, reviews } = req.body
    const owner = req.user._id
  
    const newBook = new Book({
        title,
        author,
        isbn,
        owner,
        hasCopy,
        reviews
    });
  
    newBook.save()
    .then(() => res.json('New book added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  })

router.route('/:id').get((req, res) => {
    Book.findById(req.params.id)
      .then(book => res.json(book))
      .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Book.findByIdAndDelete(req.params.id)
      .then(() => res.json('Book deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
    Book.findById(req.params.id)
      .then(book => {
        book.title = req.body.title
        book.author = req.body.author
        book.isbn = req.body.isbn
        book.hasCopy = req.body.hasCopy
        book.reviews = req.body.reviews
  
        book.save()
          .then(() => res.json('Book updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  })

  module.exports = router