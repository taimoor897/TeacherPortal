const Marks = require("../models/Marks");
const Student = require("../models/Student");
const Message = require("../models/Message");

// CREATE MARKS
const createMarks = async (req, res) => {
    try {

        const {
            studentId,
            subjects,
            examType,
            teacherRemarks
        } = req.body;

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // Calculate total obtained marks
        const total = Object.values(subjects).reduce(
            (sum, mark) => sum + Number(mark || 0),
            0
        );

        // Percentage (7 subjects × 100 marks)
        const percentage = (total / 700) * 100;

        const marks = await Marks.create({
            studentId,
            className: student.className,
            subjects,
            examType,
            totalObtained: total,
            percentage,
            teacherRemarks
        });

        res.status(201).json(marks);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};


// SEND RESULT TO PARENT
const sendResultToParent = async (req, res) => {

    try {

        const marks = await Marks.findById(req.params.id)
            .populate("studentId");

        if (!marks) {
            return res.status(404).json({
                message: "Marks record not found"
            });
        }

        const msg = `
📚 Exam Result

Student: ${marks.studentId.name}
Exam: ${marks.examType || "N/A"}

Total Marks: ${marks.totalObtained}/700
Percentage: ${marks.percentage.toFixed(2)}%

Teacher Remarks:
${marks.teacherRemarks || "No remarks provided."}
`;

        await Message.create({
            studentId: marks.studentId._id,
            className: marks.className,
            type: "progress",
            content: msg
        });

        res.json({
            message: "Result sent successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

module.exports = {
    createMarks,
    sendResultToParent
};