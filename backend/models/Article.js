const mongoose = require('mongoose');
const ArticleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    date_of_publication:{
        type:Date,
        default: Date.now
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

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;