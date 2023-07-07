const mongoose = require('mongoose');
const BooksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    date_of_publication:{
        type:Date,
        default: Date.now
    },
    place_of_publication:{
        type: String,
        required: true,
    },
    lang:{
        type: String,
        default: "EN"
    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    payByPaymentGetway:{
        type:Boolean,
        default:false
    }
}, { versionKey: false });

const Books = mongoose.model('Books', BooksSchema);
module.exports = Books;