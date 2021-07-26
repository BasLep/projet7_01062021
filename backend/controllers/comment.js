const Article = require("../models/Article");
const Comment = require("../models/Comment");
const User = require("../models/User");

exports.postComment = async (req, res) => {
	const postcomment = await Comment.create({
		userId: req.body.userId,
		articleId: req.body.articleId,
		content: req.body.content
	});
	res.status(201).json(postcomment);
};

exports.getAllComments = async (req, res) => {
	const comments = await Comment.findAll({
		where: { articleId: req.params.id },
		include: [{ model: User, as: "User" }]
	});
	res.json(comments);
};

exports.getOneComment = async (req, res) => {
	const comment = await Comment.findByPk(req.params.id, {
		include: [{ model: User, as: "User" }]
	});
	res.json(comment);
};

exports.deleteComment = async (req, res) => {
	const comment = await Comment.findByPk(req.params.id);
	await comment.destroy();
	res.status(201).json({ message: "commmentaire supprimé" });
};

exports.modifyComment = async (req, res) => {
	const comment = await Comment.findByPk(req.params.id);
	comment.content = req.body.content;
	await comment.save();
	res.status(201).json(comment);
};
