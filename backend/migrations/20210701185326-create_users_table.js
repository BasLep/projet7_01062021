"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable("users", {
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
			isAdmin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			job: {
				type: DataTypes.TEXT,
				defaultValue: ""
			},
			desk: {
				type: DataTypes.TEXT,
				defaultValue: ""
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable("users");
	}
};
