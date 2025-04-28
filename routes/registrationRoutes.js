const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const User = require('../models/user');
const Course = require('../models/course');
const jwt = require('jsonwebtoken'); // Add this line to import jsonwebtoken

// Add a course to a student's registration
router.post('/add', async (req, res) => {
        const { id, Code } = req.body;
        if (!id || !Code) {
            return res.status(400).json({ error: 'Missing required fields' });
          }
        
        console.log('Received:', { id, Code });


  try {
 
      // Check if the course exists
      let registration = await Registration.findOne({ id });

    if (!registration) {
      registration = new Registration({ id, courses: [] });
    }

    const isAlreadyRegistered = registration.courses.some((course) => course.Code === Code);

    if (isAlreadyRegistered) {
      return res.status(400).json({ message: 'Course already registered.' });
    }

    registration.courses.push({ Code });
    await registration.save();

    res.status(201).json(registration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding course.' });
  }
});

// Drop a course from a student's registration
router.post('/drop', async (req, res) => {
  const { Code } = req.body; // Extract the course Code
  const token = req.headers.authorization?.split(' ')[1]; // Extract JWT token
  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const studentId = decoded.id; // Extract the student ID from the token

    const registration = await Registration.findOne({ studentId});

    if (!registration) {
      return res.status(404).json({ error: 'No registration found for this student.' });
  }
    const updatedRegistration = await Registration.updateOne(
      { studentId},
      { $pull: { courses: { Code } } } 
  );

  if (updatedRegistration.nModified === 0) {
      return res.status(404).json({ error: 'Course not found or not registered' });
  }
  const updatedRegistrationData = await Registration.findOne({ studentId }).populate('courses');
    res.json({ success: 'Course dropped successfully', registration: updatedRegistrationData });
  } catch (error) {
    console.error('Error dropping course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all registered courses for a student
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      // Find the registration for the given id and populate the courses
      const registration = await Registration.findOne({ id }).populate('courses');

      if (!registration) {
          return res.status(404).json({ error: 'No registration found for this student.' });
      }

      // Respond with the courses associated with the registration
      res.status(200).json({ courses: registration.courses });
  } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;