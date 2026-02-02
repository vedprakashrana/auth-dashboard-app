const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');

const createTask = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),

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

            const { title, description, status, priority } = req.body;

            const task = await Task.create({
                title,
                description,
                status: status || 'pending',
                priority: priority || 'medium',
                userId: req.user._id,
            });

            res.status(201).json({
                success: true,
                message: 'Task created successfully',
                task,
            });
        } catch (error) {
            console.error('Create task error:', error);
            res.status(500).json({
                success: false,
                message: 'Error creating task',
                error: error.message,
            });
        }
    },
];

const getTasks = async (req, res) => {
    try {
        const { search, status, priority, page = 1, limit = 10 } = req.query;

        const query = { userId: req.user._id };

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }

        const skip = (page - 1) * limit;

        const tasks = await Task.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Task.countDocuments(query);

        res.status(200).json({
            success: true,
            count: tasks.length,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            tasks,
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tasks',
            error: error.message,
        });
    }
};

const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        console.error('Get task error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching task',
            error: error.message,
        });
    }
};

const updateTask = [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),

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

            const { title, description, status, priority } = req.body;

            const task = await Task.findOne({
                _id: req.params.id,
                userId: req.user._id,
            });

            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found',
                });
            }

            if (title !== undefined) task.title = title;
            if (description !== undefined) task.description = description;
            if (status !== undefined) task.status = status;
            if (priority !== undefined) task.priority = priority;

            await task.save();

            res.status(200).json({
                success: true,
                message: 'Task updated successfully',
                task,
            });
        } catch (error) {
            console.error('Update task error:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating task',
                error: error.message,
            });
        }
    },
];

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
        });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting task',
            error: error.message,
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
};
