const Parent = require('../models/Parent');

// GET ALL PARENTS
const getParents = async (req, res) => {
    try {
        const parents = await Parent.find();
        res.json(parents);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getParents
};