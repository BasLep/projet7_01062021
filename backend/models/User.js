const { DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define("User", {
	id: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	firstName: {
		type: DataTypes.STRING
	},
	lastName: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING,
		unique: true
	},
	password: {
		type: DataTypes.STRING
	},
	job: {
		type: DataTypes.TEXT
	},
	desk: {
		type: DataTypes.TEXT
	}
});

module.exports = User;
