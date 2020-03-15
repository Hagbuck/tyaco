const express = require('express');
const router = express.Router();

module.exports = () => {

	/**
	 * Edit a specific comment
	 */
	router.put('/:comment_id', (req, res) => {

	});

	/**
	 * Delete a specific comment
	 */
	router.delete('/:comment_id', (req, res) => {

	});

	return router;
};
