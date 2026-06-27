const express = require("express");

const {
  getTeachers,
  createTeacher,
  loginTeacher,
} = require("../controllers/teacherController");

const router = express.Router();

router.get("/", getTeachers);
router.post("/", createTeacher);
router.post("/login", loginTeacher);

module.exports = router;