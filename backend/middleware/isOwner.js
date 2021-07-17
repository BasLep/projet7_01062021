const Article = require("../models/Article");

module.exports = async (req, res, next) => {
	const article = await Article.findByPk(req.params.id);
	if (req.body.userId === article.userId || req.body.isAdmin === true) {
		next();
	} else {
		return res.status(403).json({ message: "Requête non authentifiée" });
	}
};
