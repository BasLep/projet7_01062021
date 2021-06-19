const { DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
	firstName: {
		type: DataTypes.STRING,
		required: true
	},
	lastName: {
		type: DataTypes.STRING,
		required: true
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		required: true
	},
	password: {
		type: DataTypes.STRING,
		required: true
	}
});

module.exports = User;
