const express = require('express');

const {
    markAttendance,
    bulkAttendance,
    getAttendance,
    getAttendanceByDate,
    getStudentAttendance   // ✅ FIX: import added
} = require('../controllers/attendanceController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create attendance
router.post('/', protect, markAttendance);

// Bulk attendance
router.post('/bulk', protect, bulkAttendance);

// Get all attendance


// ✅ IMPORTANT: specific route must come BEFORE dynamic ones
router.get('/student/:id', protect, getStudentAttendance);

// Get attendance by date
router.get('/date/:date', protect, getAttendanceByDate);

module.exports = router;