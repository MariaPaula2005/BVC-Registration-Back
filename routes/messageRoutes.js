const express = require('express');
const Message = require('../models/message');

const router = express.Router();

router.post('/contact', async (req, res) => {
    try {
        const { studentName, studentEmailValue, message } = req.body;
        if (!studentName || !studentEmailValue || !message) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        const newMessage = new Message({ studentName, studentEmailValue, message });
        await newMessage.save();
    
        res.status(201).json({ success: 'Message sent successfully' });
      } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    router.get('/messages', async (req, res) => {
        try {
          const messages = await Message.find().sort({ timestamp: -1 }); // Sort by most recent
          res.status(200).json(messages);
        } catch (error) {
          console.error('Error retrieving messages:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

    module.exports = router;