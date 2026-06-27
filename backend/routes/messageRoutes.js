const express = require('express');

const {
    createMessage,
    getMessages,
    getMessagesByType,
    deleteMessage,
    markAsSent   // ✅ ADD THIS
} = require('../controllers/messageController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create message
router.post('/', protect, createMessage);

// Get all messages
router.get('/', protect, getMessages);

// Get messages by type
router.get('/type/:type', protect, getMessagesByType);

// Delete message
router.delete('/:id', protect, deleteMessage);

// Mark as sent
router.patch('/sent/:id', protect, markAsSent);

module.exports = router;