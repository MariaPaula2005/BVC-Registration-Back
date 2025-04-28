const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  Code: {
    type: String,
    required: true,
    unique: true
  },
  Program: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Term: {
    type: String,
    required: true
  },
  Department: {
    type: String,
    required: true
  },
  Fees: {
    type: Number,
    required: true
  },
  StartDate: {
    type: Date,
    required: true
  },
  EndDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Program', programSchema);
