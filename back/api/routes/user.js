const express = require('express');
const router = express.Router();

module.exports = () => {

	/** 
	 * Register a new user
	 */
	router.post('/register', (req, res) => {

	});

	/** 
	 * Log an user and give him his token
	 */
	router.get('/connexion', (req, res) => {

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