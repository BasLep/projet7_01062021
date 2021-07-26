const Article = require("../models/Article");
const User = require("../models/User");
const fs = require("fs");

exports.postArticle = async (req, res) => {
	const image = req.body.imageUrl;
	const imgsplit = image.replace(/^data:image\/\w+;base64,/, "");
	let buf = Buffer.from(imgsplit, "base64");
	let imageName = req.body.imageName;
	let name = imageName.split(".")[0];
	let format = imageName.split(".")[1];
	let date = Date.now();
	fs.writeFile(`images/${name}${date}.${format}`, buf, function (err, data) {
		if (err) {
			return console.log(err);
		}
	});
	const postarticle = await Article.create({
		userId: req.body.userId,
		title: req.body.title,
		description: req.body.description,
		textArticle: req.body.textArticle,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${name}${date}.${format}`
	});
	res.status(201).json(postarticle);
};

exports.getAllArticle = async (req, res) => {
	const articles = await Article.findAll({
		include: [{ model: User, as: "User" }]
	});
	res.json(articles);
};

exports.getOneArticle = async (req, res) => {
	const article = await Article.findByPk(req.params.id, {
		include: [{ model: User, as: "User" }]
	});
	res.json(article);
};

exports.modifyArticle = async (req, res) => {
	const article = await Article.findByPk(req.params.id);
	let imageUrl = req.body.imageUrl;
	if (imageUrl !== null) {
		const filename = await article.imageUrl.split("/images/")[1];
		fs.unlink(`images/${filename}`, (err) => {
			if (err) {
				return console.log(err);
			}
		});
		const image = req.body.imageUrl;
		const imgsplit = image.replace(/^data:image\/\w+;base64,/, "");
		let buf = Buffer.from(imgsplit, "base64");
		let imageName = req.body.imageName;
		let name = imageName.split(".")[0];
		let format = imageName.split(".")[1];
		let date = Date.now();
		fs.writeFile(`images/${name}${date}.${format}`, buf, function (err, data) {
			if (err) {
				return console.log(err);
			}
		});
		article.imageUrl = `${req.protocol}://${req.get("host")}/images/${name}${date}.${format}`;
	}
	article.title = req.body.title;
	article.description = req.body.description;
	article.textArticle = req.body.textArticle;
	await article.save();
	res.status(201).json({ message: "article modifié" });
};

exports.deleteArticle = async (req, res) => {
	const article = await Article.findByPk(req.params.id);
	const filename = await article.imageUrl.split("/images/")[1];
	fs.unlink(`images/${filename}`, (err) => {
		if (err) {
			return console.log(err);
		}
	});
	await article.destroy();
	res.status(201).json({ message: "Article supprimé" });
};
