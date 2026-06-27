const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    rollNo: {
        type: String,
        required: true,
        unique: true
    },

    className: {
        type: String,
        required: true
    },

    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    languagePreference: {
        type: String,
        enum: ['english', 'urdu'],
        default: 'english'
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Student', studentSchema);