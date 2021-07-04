const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.NAMEDB, process.env.USERDB, process.env.PASSWORDDB, {
	host: "localhost",
	dialect: "mysql"
});

module.exports = sequelize;
global.sequelize = sequelize;
