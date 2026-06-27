const Message = require('../models/Message');
const Student = require('../models/Student');

// Create Message (NOW CLASS-AWARE)
const createMessage = async (req, res) => {
    try {

        let className = req.body.className;

        // If className not sent → derive from student
        if (!className && req.body.studentId) {
            const student = await Student.findById(req.body.studentId);
            className = student?.className;
        }

        const message = await Message.create({
            ...req.body,
            className
        });

        res.status(201).json(message);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get All Messages (OPTIONAL CLASS FILTER)
const getMessages = async (req, res) => {
    try {

        const { className } = req.query;

        const filter = {};

        if (className) {
            filter.className = className;
        }

        const messages = await Message.find(filter)
            .populate({
                path: "studentId",
                populate: {
                    path: "parentId"
                }
            });

        res.json(messages);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get Messages By Type (OPTIONAL CLASS FILTER)
const getMessagesByType = async (req, res) => {
    try {

        const { className } = req.query;

        const filter = {
            type: req.params.type
        };

        if (className) {
            filter.className = className;
        }

        const messages = await Message.find(filter)
            .populate({
                path: "studentId",
                populate: {
                    path: "parentId"
                }
            });

        res.json(messages);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Delete message
const deleteMessage = async (req, res) => {
    try {

        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        await message.deleteOne();

        res.json({
            message: "Deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Mark as sent
const markAsSent = async (req, res) => {
    try {

        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        message.sent = true;
        await message.save();

        res.json({
            message: "Marked as sent",
            data: message
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createMessage,
    getMessages,
    getMessagesByType,
    deleteMessage,
    markAsSent
};