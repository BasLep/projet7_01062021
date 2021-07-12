const jwtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
	let headers = req.headers;
	console.log(headers);
	try {
		const token = headers.split(",")[1];
		const userIdHeaders = headers.split(",")[0];
		const decodedToken = jwtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const userId = decodedToken.userId;
		if (userIdHeaders && userIdHeaders !== userId) {
			throw "User ID non valable";
		} else {
			req.body.userIdFromToken = userId;
			next();
		}
	} catch (error) {
		res.status(401).json({ error: error | "Requête non authentifiée" });
	}
};
