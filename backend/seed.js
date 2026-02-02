require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        seedDatabase();
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Task.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create demo user
        const demoUser = await User.create({
            name: 'Demo User',
            email: 'demo@example.com',
            password: 'demo123',
        });
        console.log('✅ Created demo user');

        // Create sample tasks
        const tasks = [
            {
                title: 'Complete project documentation',
                description: 'Write comprehensive README and API documentation',
                status: 'in-progress',
                priority: 'high',
                userId: demoUser._id,
            },
            {
                title: 'Review pull requests',
                description: 'Review and merge pending pull requests from team members',
                status: 'pending',
                priority: 'medium',
                userId: demoUser._id,
            },
            {
                title: 'Update dependencies',
                description: 'Update all npm packages to latest versions',
                status: 'pending',
                priority: 'low',
                userId: demoUser._id,
            },
            {
                title: 'Fix authentication bug',
                description: 'Resolve the JWT token expiration issue',
                status: 'completed',
                priority: 'high',
                userId: demoUser._id,
            },
            {
                title: 'Design new dashboard',
                description: 'Create mockups for the new analytics dashboard',
                status: 'in-progress',
                priority: 'medium',
                userId: demoUser._id,
            },
        ];

        await Task.insertMany(tasks);
        console.log('✅ Created sample tasks');

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📧 Demo credentials:');
        console.log('Email: demo@example.com');
        console.log('Password: demo123\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};
