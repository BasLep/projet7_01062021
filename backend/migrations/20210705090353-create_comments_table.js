"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable("comments", {
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			content: {
				type: DataTypes.STRING(300)
			},
			articleId: DataTypes.INTEGER(11),
			userId: DataTypes.INTEGER(11),
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable("comments");
	}
};
