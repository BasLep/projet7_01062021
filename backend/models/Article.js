const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Article = db.define("Article", {
	id: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING
	},
	description: {
		type: DataTypes.STRING
	},
	textArticle: {
		type: DataTypes.TEXT
	}
});
module.exports = Article;
