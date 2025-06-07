const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  ISBN: {
    type: String,
    required: true,
    unique: true // ISBN should be unique
  },
  genre: {
    type: String,
    required: true
  },
  publishedYear: {
    type: Number,
    required: true
  },
  copiesAvailable: {
    type: Number,
    required: true
  },
  totalCopies: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Book', bookSchema);
