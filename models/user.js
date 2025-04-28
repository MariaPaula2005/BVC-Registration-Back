const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-sequence')(mongoose);


const userSchema = new Schema ({

    id: {
        type:Number,
        unique: true,
    },

    FirstName:{
        type: String,
        required: true
    },

    LastName: {
        type: String,
        required: true
    },

    Password: {
        type: String,
        required: true, 
    },

    Email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address."],

    },

    Phone: {
        type: String,
        required: true,
    },

    Program: {
        type: String,
        required: false,
    },

    Term: {
        type: String,
        required: false,
    },

    isAdmin: {
        type: Boolean,
        required: false,
        default: false,
    },

});

userSchema.plugin(autoIncrement, { inc_field: 'id' });


const User = mongoose.model('User', userSchema);
module.exports = User;