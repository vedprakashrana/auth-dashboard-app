const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message,
        });
    }
};

const updateProfile = [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email'),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array().map(err => ({
                        field: err.path,
                        message: err.msg,
                    })),
                });
            }

            const { name, email } = req.body;
            const updateFields = {};

            if (name) updateFields.name = name;
            if (email) {
                const existingUser = await User.findOne({ email, _id: { $ne: req.user._id } });
                if (existingUser) {
                    return res.status(400).json({
                        success: false,
                        message: 'Email already in use',
                    });
                }
                updateFields.email = email;
            }

            const user = await User.findByIdAndUpdate(
                req.user._id,
                updateFields,
                { new: true, runValidators: true }
            );

            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                },
            });
        } catch (error) {
            console.error('Update profile error:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating profile',
                error: error.message,
            });
        }
    },
];

module.exports = {
    getProfile,
    updateProfile,
};
