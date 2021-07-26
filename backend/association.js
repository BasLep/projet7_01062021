module.exports = async () => {
	const Article = require("./models/Article");
	const User = require("./models/User");
	const Comment = require("./models/Comment");

	User.hasMany(Article, {
		as: "Articles",
		foreignKey: "userId",
		onDelete: "CASCADE",
		hooks: true
	});
	Article.belongsTo(User, { as: "User", foreignKey: "userId" });

	// Comment.belongsTo(Article, { as: "Articles", foreignKey: "articleId" });
	Article.hasMany(Comment, {
		as: "Comments",
		foreignKey: "articleId",
		onDelete: "CASCADE",
		hooks: true
	});
	// User.hasMany(Comment, { as: "Comments", foreignKey: "userId" });
	Comment.belongsTo(User, { as: "User", foreignKey: "userId" });
};
