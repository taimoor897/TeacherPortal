const express = require("express");
const router = express.Router();

const {
    createMarks,
    sendResultToParent
} = require("../controllers/marksController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createMarks);
router.post("/:id/send", protect, sendResultToParent);

module.exports = router;