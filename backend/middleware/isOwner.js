const Article = require("../models/Article");

module.exports = async (req, res, next) => {
	const article = await Article.findByPk(req.params.id);
	if (req.body.userId !== article.userId) {
		return res.status(403).json({ message: "Requête non authentifiée" });
	} else {
		next();
	}
};
