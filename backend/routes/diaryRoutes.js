const express = require("express");

const router = express.Router();

const {
    createDiary,
    getDiaryByClass
} = require("../controllers/diaryController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createDiary);

router.get("/", protect, getDiaryByClass);

module.exports = router;