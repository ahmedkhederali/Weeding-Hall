const Article = require("../models/Article");
const cloudinary = require("cloudinary");
const Redis = require("redis");

exports.addArticle= async (req, res) => {
    try {
        const newArticle = await Article.create(req.body);

        res.status(201).json({
            newArticle
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};
exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            article
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);

        res.status(200).json({
            article
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};
exports.getAllArticle = async (req, res) => {
    try {
        const article = await Article.find({})

        res.status(200).json({
            article
        });

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        res.status(200).json({
            article
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};