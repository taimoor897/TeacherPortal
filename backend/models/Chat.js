const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
{
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    sender: {
        type: String,
        enum: ["parent", "teacher"],
        required: true
    },

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    message: {
        type: String,
        required: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Chat", chatSchema);