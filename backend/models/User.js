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
		required: true,
		unique: {
			args: true,
			message: "Cette adresse mail est déjà dans notre base de données"
		}
	},
	password: {
		type: DataTypes.STRING,
		required: true
	}
});

module.exports = User;
