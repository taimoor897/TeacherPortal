const Chat = require("../models/Chat");

// SEND MESSAGE
const sendMessage = async (req, res) => {
    try {

        const chat = await Chat.create(req.body);

        res.status(201).json(chat);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET CHAT OF A STUDENT
const getChat = async (req, res) => {
    try {

        const chats = await Chat.find({
            studentId: req.params.studentId
        }).sort({ createdAt: 1 });

        res.json(chats);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    sendMessage,
    getChat
};