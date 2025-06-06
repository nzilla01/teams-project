const mongoose = require('mongoose');

const connnectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connnectDB;