console.log("aiController loaded");
const Message = require('../models/Message');
const Student = require('../models/Student');
const { generateMessage } = require('../services/geminiService');


// Behavior report
const generateBehaviorMessage = async (req, res) => {
    console.log("Behavior endpoint hit");

    try {

        const { studentName, issue } = req.body;

        const prompt = `
You are a school administrator.

Convert the following issue into a professional and respectful message to parents.

Student: ${studentName}

Issue:
${issue}

Keep it concise and polite.
`;

        const message = await generateMessage(prompt);

        res.json({
            message
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }

};


// Progress report
const generateProgressReport = async (req, res) => {

    try {

        const { studentName, marks } = req.body;

        const prompt = `
Generate a professional progress report for parents.

Student: ${studentName}

Marks:
${JSON.stringify(marks)}

Mention strengths and areas needing improvement.
`;

        const message = await generateMessage(prompt);

        res.json({
            message
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }

};


// Translate English to Urdu
const translateToUrdu = async (req, res) => {

    try {

        const { text } = req.body;

        const prompt = `
Translate the following message into simple and professional Urdu.

${text}
`;

        const message = await generateMessage(prompt);

        res.json({
            message
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }

};



// SEND AI MESSAGE TO PARENT (NEW)
const sendToParent = async (req, res) => {
    try {

        const { studentId, message, type } = req.body;

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const newMessage = await Message.create({
            studentId: student._id,
            className: student.className,   // ✅ required field
            type,
            content: message
        });

        res.json({
            success: true,
            message: newMessage
        });

    } catch (err) {
        console.log(err);   // 👈 keep this for debugging
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    generateBehaviorMessage,
    generateProgressReport,
    translateToUrdu,
    sendToParent
};