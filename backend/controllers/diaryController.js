const Diary = require("../models/Diary");

// Teacher creates diary
const createDiary = async (req, res) => {

    try {

        const diary = await Diary.create(req.body);

        res.status(201).json(diary);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Get diaries for class
const getDiaryByClass = async (req, res) => {

    try {

        const diaries = await Diary.find({
            className: req.query.className
        }).sort({ createdAt: -1 });

        res.json(diaries);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    createDiary,
    getDiaryByClass
};