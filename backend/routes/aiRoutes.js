console.log("aiRoutes loaded");

const express = require('express');

const {
    generateBehaviorMessage,
    generateProgressReport,
    translateToUrdu,
    sendToParent
} = require('../controllers/aiController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/behavior', protect, generateBehaviorMessage);
router.post('/progress', protect, generateProgressReport);
router.post('/translate', protect, translateToUrdu);

// ✅ FIXED
router.post("/send-to-parent", sendToParent);

module.exports = router;