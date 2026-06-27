

const express = require('express');

const {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');

const {
    getStudentProfile
} = require('../controllers/studentProfileController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// normal CRUD
router.route('/')
    .get(protect, getStudents)
    .post(protect, createStudent);

// basic student
router.route('/:id')
    .get(protect, getStudentById)
    .put(protect, updateStudent)
    .delete(protect, deleteStudent);

// ⭐ NEW: full intelligence profile
router.get('/profile/:id', protect, getStudentProfile);

module.exports = router;