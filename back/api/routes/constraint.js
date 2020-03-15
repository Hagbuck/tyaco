const express = require('express');
const router  = express.Router();

module.exports = () => {

	/**
	 * Get all constraints
	 */
	router.get('/', (req, res) => {

	});

	/**
	 * Get a specific constraint
	 */
	router.get('/:constraint_id', (req, res) => {

	});

	/**
	 * Create a new constraint
	 */
	router.post('/', (req, res) => {

		const title       = req.body.title;
		const author      = req.body.author;
		const description = req.body.description;

	// 	db.contraint.save({
	// 		"title" : title,
	// 		"author" : author,
	// 		"description" : description
	// 	});
	});

	/**
	 * Edit a specific contraints
	 */
	router.delete('/:constraint_id', (req, res) => {

	});

	/**
	 * Delete a specific contraints
	 */
	router.delete('/:constraint_id', (req, res) => {

	});

	return router;
};
