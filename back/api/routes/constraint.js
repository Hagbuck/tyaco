const express = require('express');
const router = express.Router();

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
	 * Create a new constrainte
	 */
	router.post('/', (req, res) => {

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