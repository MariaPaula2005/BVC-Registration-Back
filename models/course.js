const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const courseSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    Code:{
        type: String,
        required: true
    },
    Course:{
        type: String,
        required: true
    },
    Program: {
        type: String,
        required: true
    },
    Term: {
        type: String,
        required: true
    },
    StartDate: {
        type: Date,
        required: true
    },
    EndDate: {
        type: Date,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Fees: {
        type: String, 
        required: true
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
