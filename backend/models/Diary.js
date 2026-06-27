const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema(
{
    className: {
        type: String,
        required: true
    },

    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    lesson: {
        type: String,
        required: true
    },

    homework: {
        type: String,
        default: ""
    },

    announcement: {
        type: String,
        default: ""
    },

    priority: {
        type: String,
        enum: ["Normal", "Important", "Urgent"],
        default: "Normal"
    },

    date: {
        type: Date,
        default: Date.now
    }

},
{ timestamps: true });

module.exports = mongoose.model("Diary", diarySchema);