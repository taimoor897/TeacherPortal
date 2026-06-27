const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
{
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    className: {
        type: String,
        required: true   // 🔥 NEW
    },

    status: {
        type: String,
        enum: ["Present", "Absent", "Late"],
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);