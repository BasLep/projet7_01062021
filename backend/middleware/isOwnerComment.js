const Comment = require("../models/Comment");

module.exports = async (req, res, next) => {
	const comment = await Comment.findByPk(req.params.id);
	if (req.body.userId === comment.userId || req.body.isAdmin === true) {
		next();
	} else {
		return res.status(403).json({ message: "Requête non authentifiée" });
	}
};
