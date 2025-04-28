const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  


router.post('/register', async (req, res) => {
    try {
      const { FirstName, LastName, Email, Password, Phone, Program, Term, isAdmin} = req.body;
  
      if (!FirstName || !LastName || !Email || !Phone || !Password) {
        return res.status(400).send("All fields are required!");
      }
      // Check if user already exists
      const userExists = await User.findOne({ Email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

  
      // Create a new user
      const newUser = new User({
        FirstName,
        LastName,
        Email,
        Phone,
        Password: hashedPassword,
        Program, 
        Term,
        isAdmin,
      });
  
      // Save the user to the database
      await newUser.save();

      const token = jwt.sign(
        { userId: newUser._id.toString(), isAdmin: newUser.isAdmin, email: newUser.Email },
        'your_jwt_secret',
        { expiresIn: '1h' }
      );
  
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          FirstName,
          LastName,
          Email,
          isAdmin,
          Program,
          Term
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // User Login Route
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and Password are required' });
      }  

      // Find user by email
      
    const user = await User.findOne({ Email: email.toLowerCase() });      
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.Password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create a JWT token
      const token = jwt.sign(
        { userId: user._id.toString(), isAdmin: user.isAdmin, email: user.Email },
        'your_jwt_secret',
        { expiresIn: '1h' }
      );
  
      // Respond with token and user details
      console.log('User logged in successfully:', token);
      res.status(200).json({
        success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Password: user.Password,
        Email: user.Email,
        isAdmin: user.isAdmin,
        Program: user.Program,
        Term: user.Term,
        Phone: user.Phone
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
  // Get User Info Route (protected)
  router.get('/me', async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      const decoded = jwt.verify(token, 'your_jwt_secret');
      const user = await User.findById(decoded.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({
        id: user.id,
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email,
        program: user.Program,
        term: user.Term, 
        phone: user.Phone, 
        password: user.Password
      });
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Token expired' });
      }
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(400).json({ message: 'Invalid token' });
      }
      
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.put('/me',  async (req, res) => {
    try {

  
      const { phone, password, firstName, lastName, email } = req.body;
  

      const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
        // Find user and update fields
        if (phone) user.Phone = phone;
        if (firstName) user.FirstName = firstName;
        if (lastName) user.LastName = lastName;
        if (email) user.Email = email;
        if (password) user.Password = await bcrypt.hash(password, 10);

        await user.save();
  
        res.json({
          firstName: user.FirstName,
          lastName: user.LastName,
          email: user.Email,
          phone: user.Phone,
          password: user.Password, // Mask password for response
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    });
      
    router.get('/students', async (req, res) => {
      try {
          const students = await User.find({ isAdmin: false });  // Query users where isAdmin is false
          res.json(students);  // Send the list of students as a JSON response
      } catch (error) {
          console.error('Error fetching students:', error);
          res.status(500).send('Server error');
      }
  });

  module.exports = router;