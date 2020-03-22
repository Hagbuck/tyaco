const express = require('express');
const router  = express.Router();
const Comment = require('../../models/comment');

module.exports = () => {

	/**
	 * Edit a specific comment
	 */
	router.put('/:comment_id', (req, res) => {
		Comment.findByIdAndUpdate(req.params.comment_id, req.body)
		.then( (comment) => {
			res.status(200).json(comment);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Delete a specific comment
	 */
	router.delete('/:comment_id', (req, res) => {
		Comment.findByIdAndDelete(req.params.comment_id)
		.then( (comment) => {
			res.status(200).json(comment);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	return router;
};
