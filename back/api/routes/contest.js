const express = require('express');
const router = express.Router();

module.exports = () => {

	/** 
	 * Get all contests
	 */
	router.get('/', (req, res) => {

	});

	/** 
	 * Get a specific contest
	 */
	router.get('/:contest_id', (req, res) => {

	});

	/** 
	 * Create a new contest
	 */
	router.post('/', (req, res) => {

	});

	/** 
	 * Edit a specific contest
	 */
	router.put('/:contest_id', (req, res) => {

	});

	/** 
	 * Delete a specific contest
	 */
	router.delete('/:contest_id', (req, res) => {

	});

	/** 
	 * Submit a submission for a specific contest
	 */
	router.post('/:contest_id/submission', (req, res) => {

	});

	return router;
};