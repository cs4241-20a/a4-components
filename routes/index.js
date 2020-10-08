const express = require('express')
const Book = require('../models/Book')
const router = express.Router()


router.get('/', (req, res) => {
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
      .then(book => res.send(book))
      .catch(err => res.send({ msg: `Error: ${err}` }));
})

router.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
      .then(() => res.send({ message: 'Book deleted.' }))
      .catch(err => res.send({ msg: `Error: ${err}` }))
})

router.post('/update/:id',(req, res) => {
    Book.findById(req.params.id)
      .then(book => {
        book.title = req.body.title
        book.author = req.body.author
        book.isbn = req.body.isbn
        book.hasCopy = req.body.hasCopy
        book.reviews = req.body.reviews
  
        book.save()
          .then(() => res.send({ message: 'Book updated!' }))
          .catch(err => res.send({ msg: `Error: ${err}` }));
      })
      .catch(err => res.json({ msg: ` Error: ${err}` }));
  })

  module.exports = router