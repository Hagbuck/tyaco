const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const salt_round = 10;
const User = require('../../models/user');

module.exports = () => {

	/**
	 * Register a new user
	 */
	router.post('/register', (req, res) => {

		/* Hash password with bcrypt */
		bcrypt.hash(req.body.password, salt_round, (err, hash) => {
			if(err) res.sendStatus(500);
			else {
				/* Set the hash password instead of plain text password */
				req.body.password = hash;

				/* Save user into DB */
				let user = new User(req.body);
				user.save((err, user) => {
					if(err) res.sendStatus(500);
					res.sendStatus(200);
				});
			}
		});
	});

	/**
	 * Log an user and give him his token
	 */
	router.get('/connexion', (req, res) => {
		const username = req.query.username;
		const password = req.query.password;

		res.send('Your token is : ' + username + ':' + password);
	});

	/**
	 * Get all  users
	 */
	router.get('/', (req, res) => {
		User.find({}, (err, users) => {
			if(err) res.sendStatus(500);
			res.status(200).json(users);
		});
	});

	/**
	 * Get a specific user
	 */
	router.get('/:user_id', (req, res) => {

	});

	/**
	 * Edit a specific user
	 */
	router.put('/:user_id', (req, res) => {

	});

	/**
	 * Delete a specific user
	 */
	router.delete('/:user_id', (req, res) => {

	});

	return router;
};
