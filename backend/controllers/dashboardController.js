const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Message = require('../models/Message');

const getDashboardStats = async (req, res) => {
    try {

        const { className } = req.query;

        // 🔥 FILTER STUDENTS BY CLASS
        const students = await Student.find({ className });

        const studentIds = students.map(s => s._id);

        // 🔥 FILTER ATTENDANCE BY CLASS STUDENTS
        const attendance = await Attendance.find({
            studentId: { $in: studentIds }
        });

        // 🔥 FILTER MESSAGES BY CLASS STUDENTS
        const messages = await Message.find({
            studentId: { $in: studentIds }
        });

        res.json({
            totalStudents: students.length,
            totalAttendance: attendance.length,
            totalMessages: messages.length
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getDashboardStats
};