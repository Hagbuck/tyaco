const express = require('express');
const router  = express.Router();

module.exports = () => {

	/**
	 * Register a new user
	 */
	router.post('/register', (req, res) => {
		const username  = req.body.username;
		const password  = req.body.password;
		const email     = req.body.email;
		const firstname = req.body.firstname; // Optionnal
		const lastname  = req.body.lastname;  // Optionnal

		const str = username + ' : ' + password + ' : ' + email + ' : ' + firstname + ' : ' + lastname;

		console.log(str);

		res.send(str);

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
