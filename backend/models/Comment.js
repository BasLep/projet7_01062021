const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Comment = db.define("Comment", {
	id: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	content: {
		type: DataTypes.STRING(300)
	}
});
module.exports = Comment;
