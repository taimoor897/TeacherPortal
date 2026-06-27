console.log("PARENT ROUTES FILE LOADED");
const express = require('express');
const router = express.Router();

const { getParents } = require('../controllers/parentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getParents);

module.exports = router;