const { Sequelize, DataTypes } = require("sequelize");

module.exports = new Sequelize("groupomania", "root", "", {
	host: "localhost",
	dialect: "mysql"
});
