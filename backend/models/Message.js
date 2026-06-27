const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
{
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },

    className: {
        type: String,   // 🔥 NEW
        required: true
    },

    type: {
        type: String,
        enum: ["attendance", "fee", "event", "behavior", "progress"],
        required: true
    },

    language: {
        type: String,
        enum: ["english", "urdu"],
        default: "english"
    },

    content: {
        type: String,
        required: true
    },

    sent: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);