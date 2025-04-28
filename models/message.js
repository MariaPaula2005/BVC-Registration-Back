const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    studentName: String,
    studentEmailValue: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
  });

  const Message = mongoose.model('Message', messageSchema);

  module.exports = Message;
  