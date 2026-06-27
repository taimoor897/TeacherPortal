const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    assignedClass: {
      type: String,
      required: true, // e.g. "Class 5"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);