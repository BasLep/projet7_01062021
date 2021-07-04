const jwtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const userData = JSON.parse(localStorage.getItem("dataUser"));
		const token = userData.token;
		const decodedToken = jwtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const userId = decodedToken.userId;
		if (req.body.userId && req.body.userId !== userId) {
			throw "User ID non valable";
		} else {
			req.body.userIdFromToken = userId;
			next();
		}
	} catch (error) {
		res.status(401).json({ error: error | "Requête non authentifiée" });
	}
};
