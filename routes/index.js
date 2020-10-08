const express = require('express')
const Book = require('../models/Book')
const router = express.Router()


router.get('/books', (req, res) => {
  Book.find()
  .then(books => res.send(books))
  .catch(e => console.log(e))
})

router.post('/add', async (req, res) => {
    const { title, author, isbn, hasCopy, reviews, owner } = req.body

    const book = await Book.find({ isbn: req.body.isbn })
    if(book.length > 0) {
      return res.send({ msg: 'Book already exists' })
    }
    else {
      const newBook = new Book({
        title,
        author,
        isbn,
        hasCopy,
        reviews,
        owner
    })
  
    newBook.save()
    .then(() => res.send({ message: 'New book added!' }))
    .catch(err => res.send({ msg: `Error: ${err}` }))
    }

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