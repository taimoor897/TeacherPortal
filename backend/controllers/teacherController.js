const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// GET ALL TEACHERS
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE TEACHER
const createTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN TEACHER
const loginTeacher = async (req, res) => {
  try {
    const { email } = req.body;

    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.json({
      teacher,
      token: generateToken(teacher._id, "teacher"),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTeachers,
  createTeacher,
  loginTeacher,
};