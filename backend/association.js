module.exports = async () => {
	const Article = require("./models/Article");
	const User = require("./models/User");

	User.hasMany(Article, { as: "Articles", foreignKey: "userId" });
	Article.belongsTo(User, { as: "User", foreignKey: "userId" });

	// const errHandler = (err) => {
	// 	console.log("Error: ", err);
	// };
	// const user = await User.create({
	// 	firstName: "John",
	// 	lastName: "Doe",
	// 	email: "test2@test.fr",
	// 	password: "123456",
	// 	job: "dev",
	// 	desk: "305"
	// }).catch(errHandler);
	// const article = await Article.create({
	// 	title: "test",
	// 	description: "ceci est un test",
	// 	textArticle: "test test test test",
	// 	userId: user.id
	// }).catch(errHandler);

	// const users = await User.findAll({
	// 	where: { email: "test2@test.fr" },
	// 	include: [{ model: Article, as: "Articles" }]
	// }).catch(errHandler);

	// console.log("Article: ", JSON.stringify(users));
};
