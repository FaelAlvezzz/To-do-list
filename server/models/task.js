const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    UserId: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);