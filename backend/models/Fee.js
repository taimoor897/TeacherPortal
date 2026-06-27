const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema(
{
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },

    className: {
        type: String,
        required: true
    },

    totalFee: {
        type: Number,
        required: true
    },

    paidAmount: {
        type: Number,
        default: 0
    },

    dueDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ['Paid', 'Partial', 'Unpaid', 'Overdue'],
        default: 'Unpaid'
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Fee', feeSchema);