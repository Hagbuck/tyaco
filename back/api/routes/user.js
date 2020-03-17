const express    = require('express');
const router     = express.Router();
const bcrypt     = require('bcrypt');
const salt_round = 10;
const User       = require('../../models/user');

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
					if(err) res.status(500).json(err);
					else res.sendStatus(200);
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

		let filter = {};

		if(req.query.username) filter.username   = req.query.username;
		if(req.query.email) filter.email         = req.query.email;
		if(req.query.firstname) filter.firstname = req.query.firstname;
		if(req.query.lastname) filter.lastname   = req.query.lastname;

		User.find(filter, (err, users) => {
			if(err) res.status(500).json(err);
			else res.status(200).json(users);
		});
	});

	/**
	 * Get a specific user
	 */
	router.get('/:user_id', (req, res) => {
		User.findOne({ _id : req.params.user_id }, (err, user) => {
			if(err) res.status(500).json(err);
			else res.status(200).json(user);
		});
	});

	/**
	 * Edit a specific user
	 */
	router.put('/:user_id', (req, res) => {
		User.updateOne({ _id : req.params.user_id }, req.body, (err, user) => {
			if(err) res.status(500).json(err);
			else res.status(200).json(user);
		});
	});

	/**
	 * Delete a specific user by email or username
	 */
	router.delete('/', (req, res) => {

		let filter = {};

		if(req.query.username) filter.username = req.query.username;
		if(req.query.email) filter.email       = req.query.email;

		if(filter.username || filter.email){
			User.deleteOne(filter, (err, user) => {
				if(err) res.status(500).json(err);
				else res.status(200).json(user);
			});
		} else {
			res.status(401).json({error : 'Username or email parameter should be passed !'});
		}
	});

	/**
	 * Delete a specific user
	 */
	router.delete('/:user_id', (req, res) => {
		User.deleteOne({ _id : req.params.user_id }, (err, user) => {
			if(err) res.status(500).json(err);
			else res.status(200).json(user);
		});
	});

	return router;
};
