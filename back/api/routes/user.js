const express = require('express');
const router  = express.Router();

const bcrypt     = require('bcrypt');
const salt_round = 10;

const User = require('../../models/user');

const jwt = require('../../services/jwt');

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
				user.save()
				.then( (user) => {
					user = user.toObject();
					delete user.password;

					res.status(200).json(user);
				})
				.catch( (err) => {
					res.status(500).json(err);
				});
			}
		});
	});

	/**
	 * Log an user and give him his token
	 */
	router.post('/connexion', (req, res) => {

		/* Check user */
		User.findOne({ username : req.body.username })
		.then( (user) => {

			/* Check password */
			bcrypt.compare(req.body.password, user.password, (err, hash) => {
				if(err) res.status(500).json({ error : err, message : `User(${req.body.username}) password doesn't match with provided password` });
				else {
					const token = jwt.create_token({
						id : user._id,
						username : user.username,
						email : user.email
					 });
					res.status(200).json({ token : token });
				}
			})

		})
		.catch( (err) => {
			res.status(500).send({ error : err, message : `User(${req.body.username}) not found` });
		});
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

		User.find(filter)
		.select('-password')
		.then( (users) => {
			res.status(200).json(users);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Get a specific user
	 */
	router.get('/:user_id', (req, res) => {
		// TODO : if no user, it return null, should return {} ?
		User.findById(req.params.user_id)
		.select('-password')
		.then( (user) => {
			res.status(200).json(user);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Edit a specific user
	 */
	router.put('/:user_id', (req, res) => {
		if(req.params.user_id != res.locals.decoded_token.id) return res.status(403).json({error : `You can't edit another User than yourself.`});

		User.findByIdAndUpdate(req.params.user_id, req.body, { new : true })
		.select('-password')
		.then( (user) => {
			res.status(200).json(user);
		})
		.catch( (err) => {
			res.status(500).json(err);
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
			if(filter.username != res.locals.decoded_token.username
			&& filter.email != res.locals.decoded_token.email)
				return res.status(403).json({error : `You can't delete another User than you.`});

			User.deleteOne(filter)
			.then( (user) => {
				res.status(200).json(user);
			})
			.catch( (err) => {
				res.status(500).json(err);
			});
		} else {
			res.status(401).json({error : 'Username or email parameter should be passed !'});
		}
	});

	/**
	 * Delete a specific user
	 */
	router.delete('/:user_id', (req, res) => {
		if(req.params.user_id != res.locals.decoded_token.id) return res.status(403).json({error : `You can't delete another User than yourself.`});

		User.findByIdAndDelete(req.params.user_id)
		.then( (user) => {
			res.status(200).json(user);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	return router;
};
