const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phone:     { type: String },
  address:   { type: String },
  joinDate:  { type: Date, default: Date.now },
  membershipStatus: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  }
});

module.exports = mongoose.model('Member', memberSchema);
