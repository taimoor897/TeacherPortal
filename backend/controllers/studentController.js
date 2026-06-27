const Student = require("../models/Student");

// GET ALL STUDENTS (supports teacher class filtering)
const getStudents = async (req, res) => {
    try {
        const { className } = req.query;

        const filter = className ? { className } : {};

        const students = await Student.find(filter)
            .populate("parentId");

        res.json(students);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET SINGLE STUDENT
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate("parentId");

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ADD STUDENT
const createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE STUDENT
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE STUDENT
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        await student.deleteOne();

        res.json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};