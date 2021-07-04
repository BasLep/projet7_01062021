const Article = require("../models/Article");
const User = require("../models/User");
const db = require("../config/database");

exports.postArticle = async (req, res) => {
	const postarticle = await Article.create({
		userId: req.body.userId,
		title: req.body.title,
		description: req.body.description,
		textArticle: req.body.textArticle
	});
	res.json(postarticle);
};

exports.getAllArticle = async (req, res) => {
	const articles = await Article.findAll({ include: [{ model: User, as: "User" }] });
	res.json(articles);
};

exports.getOneArticle = async (req, res) => {
	const article = await Article.findByPk(req.params.id, {
		include: [{ model: User, as: "User" }]
	});
	res.json(article);
};
