// models/Registration.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    ref: 'User' 
},
courses: [
    {
        Code: {
            type: String,
            required: true,
        },
    }
]
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;