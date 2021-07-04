"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable("articles", {
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
			},
			userId: DataTypes.INTEGER(11),
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable("articles");
	}
};
