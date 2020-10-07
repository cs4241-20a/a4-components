const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    isbn: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hasCopy: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        res: 'User'
    },
    reviews: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

const Book = mongoose.model('books', bookSchema)

module.exports = Book