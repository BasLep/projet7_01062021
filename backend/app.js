const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const userRoutes = require("./routes/user");
const articleRoutes = require("./routes/article");
const commentRoute = require("./routes/comment");
// Database
const db = require("./config/database");
db.authenticate()
	.then(() => console.log("Connecté à la base de données"))
	.catch((error) => console.log("Erreur: " + error));

require("./association")();

const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 50000
	})
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/comment", commentRoute);

module.exports = app;
