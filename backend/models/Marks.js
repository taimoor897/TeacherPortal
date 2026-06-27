const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
{
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    className: String,

    examType: {
        type: String,
        default: "Mid Term"
    },

    subjects: {
        english: Number,
        math: Number,
        urdu: Number,
        islamiat: Number,
        sst: Number,
        science: Number,
        computer: Number
    },
    teacherRemarks: {
    type: String,
    default: ""
},

    totalObtained: Number,
    totalMarks: {
        type: Number,
        default: 700
    },

    percentage: Number
},
{ timestamps: true }
);

module.exports = mongoose.model("Marks", marksSchema);