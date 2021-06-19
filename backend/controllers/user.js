require("dotenv").config();
const User = require("../models/User");
const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");

exports.signup = (req, res, next) => {
	async function validateUniqueEmail() {
		const user = await User.findOne({ where: { email: req.body.email } });
		if (user === null) {
			bcrypt
				.hash(req.body.password, 10)
				.then((hash) => {
					User.create({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						password: hash
					});
				})
				.then(() => res.status(201).json({ message: "Utilisateur créé" }))
				.catch((error) => res.status(400).json({ error }));
		} else {
			console.log("Cette adresse mail est déjà utilisée");
		}
	}
	validateUniqueEmail();
};

exports.login = (req, res, next) => {
	async function findUser() {
		const user = await User.findOne({ where: { email: req.body.email } });
		if (user === null) {
			console.log("Utilisateur non trouvé");
		} else {
			bcrypt.compare(req.body.password, user.password).then((valid) => {
				if (!valid) {
					console.log("mot de passe erroné");
				} else {
					res.status(200).json({
						userId: user.id,
						token: jwtoken.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
							expiresIn: "24h"
						})
					});
				}
			});
		}
	}
	findUser();
};

exports.deleteAccount = (req, res) => {
	async function deleteUser() {
		const user = await User.findByPk(req.params.id);
		await user.destroy();
	}
	deleteUser();
};

exports.modifyAccount = (req, res) => {
	// const userObject = req.file;
	async function modifyUser() {
		const user = await User.findByPk(req.params.id);
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		await user.save();
	}
	modifyUser();
};

exports.getAllUsers = (req, res) => {
	User.findAll()
		.then((users) => res.status(200).json(users))
		.catch((error) => res.status(400).json({ error }));
};

exports.getOneUser = (req, res) => {
	User.findByPk(req.params.id)
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(400).json({ error }));
};
