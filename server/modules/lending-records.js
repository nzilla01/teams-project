const mongoose = require('mongoose');

const lendingRecordSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'members',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'books',
    required: true
  },
  borrowDate: Date,
  dueDate: Date,
  returnDate: Date,
  status: {
    type: String,
    enum: ['borrowed', 'returned', 'overdue'],
    default: 'borrowed'
  }
});

module.exports = mongoose.model('LendingRecord', lendingRecordSchema);
