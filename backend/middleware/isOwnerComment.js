const Comment = require("../models/Comment");

module.exports = async (req, res, next) => {
	const comment = await Comment.findByPk(req.params.id);
	if (req.body.userId !== comment.userId) {
		return res.status(403).json({ message: "Requête non authentifiée" });
	} else {
		next();
	}
};
