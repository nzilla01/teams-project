const mongoose = require('mongoose');

const lendingRecordSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  borrowDate: Date,
  dueDate: Date,
  returnDate: Date,
  status: {
    type: String,
    enum: ['borrowed', 'returned', 'overdue'],
    default: 'borrowed'
  }, 
   remarks: {
    type: String,
    trim: true,
    default: ''
  }
});

module.exports = mongoose.model('LendingRecord', lendingRecordSchema);
