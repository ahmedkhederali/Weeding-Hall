const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    firstnamear: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    lastnamear: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    religionar: {
        type: String,
        enum: ["مسلم", "مسيحي"],
        required: true
    },
    religion: {
        type: String,
        enum: ["muslim", "christian"],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    addressar: {
        type: String,
        required: true
    },
    nationalid: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    hallRef: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hall",
        required: true
     },
    hallName: {
        type: String,
        required: true
    },
    hallPrice: {
        type: Number,
        required: true
    },
    hallPhone: {
        type: String,
        required: true
    },
    hallLocation: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    cake: {
        type: Number,
        required: true
    },
    priceOfOneCake: {
        type: Number,
        required: true
    },
    cans: {
        type: Number,
        required: true
    },
    pricOneCans: {
        type: Number,
        required: true
    },
    totalprice: {
        type: Number,
        required: true
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

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;