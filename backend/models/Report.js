const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    hallId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hall',
        required:true,
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ['pending','processing','resolved'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;