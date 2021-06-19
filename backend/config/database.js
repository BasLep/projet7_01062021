const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

module.exports = new Sequelize(process.env.NAMEDB, process.env.USERDB, process.env.PASSWORDDB, {
	host: "localhost",
	dialect: "mysql"
});
