const express = require('express');

const {
    createFee,
    getFees,
    updatePayment,
    deleteFee
} = require('../controllers/feeController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createFee);
router.get('/', protect, getFees);
router.patch('/:id', protect, updatePayment);
router.delete('/:id', protect, deleteFee);

module.exports = router;