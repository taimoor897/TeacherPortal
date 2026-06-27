const Parent = require('../models/Parent');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
const registerParent = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        const exists = await Parent.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Parent already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const parent = await Parent.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber
        });

        res.status(201).json(parent);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN
const loginParent = async (req, res) => {
    try {
        const { email, password } = req.body;

        const parent = await Parent.findOne({ email });

        if (!parent) {
            return res.status(404).json({ message: "Parent not found" });
        }

        const isMatch = await bcrypt.compare(password, parent.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: parent._id, role: "parent" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            parent
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// GET ALL PARENTS (for admin dropdown)
const getParents = async (req, res) => {
    try {
        const parents = await Parent.find().select("-password");
        res.json(parents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerParent,
    loginParent,
    getParents
};