const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Message = require('../models/Message');

const getStudentProfile = async (req, res) => {

    try {

        const studentId = req.params.id;

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const attendance = await Attendance.find({ studentId });

        const messages = await Message.find({ studentId });

        const total = attendance.length;
        const present = attendance.filter(a => a.status === "Present").length;

        const attendanceRate = total === 0 ? 0 : (present / total) * 100;

        res.json({
            student,
            attendance,
            messages,
            stats: {
                totalAttendance: total,
                present,
                absent: total - present,
                attendanceRate: attendanceRate.toFixed(2)
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = { getStudentProfile };