const Message = require('../models/Message');

const Fee = require('../models/Fee');
const Student = require("../models/Student");

const createFeeMessage = async (fee, studentId) => {

    const student = await Student.findById(studentId);

    const remaining = fee.totalFee - fee.paidAmount;

    let content = "";

    if (fee.paidAmount >= fee.totalFee) {
        content = "Fee fully paid. Thank you.";
    } else if (fee.paidAmount > 0) {
        content = `Fee partially paid. Remaining amount: Rs ${remaining}`;
    } else {
        content = `Fee pending. Total amount: Rs ${fee.totalFee}`;
    }

    await Message.create({
        studentId,
        className: student.className,
        type: "fee",
        content
    });
};


// Create fee record
const createFee = async (req, res) => {
    try {

        const student = await Student.findById(req.body.studentId);

        const fee = await Fee.create({
            ...req.body,
            className: student.className
        });

        await createFeeMessage(fee, fee.studentId);

        res.status(201).json(fee);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all fees
const getFees = async (req, res) => {
    try {

        const { className } = req.query;

        const filter = className ? { className } : {};

        const fees = await Fee.find(filter)
            .populate("studentId");

        res.json(fees);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteFee = async (req, res) => {
    try {

        const fee = await Fee.findById(req.params.id);

        if (!fee) {
            return res.status(404).json({
                message: "Fee not found"
            });
        }

        await fee.deleteOne();

        res.json({
            message: "Fee deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update payment
const updatePayment = async (req, res) => {
    try {
        const fee = await Fee.findById(req.params.id);

        if (!fee) {
            return res.status(404).json({ message: "Fee not found" });
        }

        fee.paidAmount = req.body.paidAmount;

        if (fee.paidAmount >= fee.totalFee) {
            fee.status = "Paid";
        } else if (fee.paidAmount > 0) {
            fee.status = "Partial";
        } else {
            fee.status = "Unpaid";
        }

        await fee.save();

        // 🔥 CREATE ALERT AFTER UPDATE
        await createFeeMessage(fee, fee.studentId);

        res.json(fee);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    createFee,
    getFees,
    updatePayment,
    deleteFee
};