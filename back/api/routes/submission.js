const express = require('express');
const router = express.Router();

module.exports = () => {

	/**
	 * Get the comments associated with the submission
	 */
	router.get('/:submission_id/comment', (req, res) => {

	});

	/**
	 * Add a new comment to a submission
	 */
	router.post('/:submission_id/comment', (req, res) => {

	});

	/**
	 * Edit a submission
	 */
	router.put('/:submission_id', (req, res) => {

	});

	/**
	 * Remove a submission
	 */
	router.delete('/:submission_id', (req, res) => {

	});

	return router;
};