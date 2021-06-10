const User = require("../models/User");
const db = require("../config/database");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
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
};

exports.login = (req, res, next) => {};
