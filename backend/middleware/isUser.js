const User = require("../models/User");

module.exports = async (req, res, next) => {
	const user = await User.findByPk(req.params.id);
	if (req.body.userId !== user.id) {
		return res.status(403).json({ message: "Requête non authentifiée" });
	} else {
		next();
	}
};
