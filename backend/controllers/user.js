require("dotenv").config();
const User = require("../models/User");
const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
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
		res.status(200).json({ message: "Adresse mail déjà utilisée" });
	}
};

exports.login = async (req, res, next) => {
	const user = await User.findOne({ where: { email: req.body.email } });
	if (user === null) {
		res.status(202).json({ message: "Utilisateur non trouvé" });
	} else {
		bcrypt.compare(req.body.password, user.password).then((valid) => {
			if (!valid) {
				res.status(201).json({ message: "Mot de passe érroné" });
			} else {
				res.status(200).json({
					userId: user.id,
					isAdmin: user.isAdmin,
					token: jwtoken.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
						expiresIn: "24h"
					})
				});
			}
		});
	}
};

exports.deleteAccount = async (req, res) => {
	const user = await User.findByPk(req.params.id);
	await user.destroy();
};

exports.modifyAccount = async (req, res) => {
	// const userObject = req.file;
	const user = await User.findByPk(req.params.id);
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.job = req.body.job;
	user.desk = req.body.desk;
	await user.save();
};

exports.getAllUsers = async (req, res) => {
	const users = await User.findAll();
	res.json(users);
};

exports.getOneUser = async (req, res) => {
	const user = await User.findByPk(req.params.id);
	res.json(user);
};
