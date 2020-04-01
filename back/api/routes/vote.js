const express = require('express');
const router  = express.Router();
const Vote    = require('../../models/vote');

module.exports = () => {

	/**
	 * Delete a specific comment
	 */
	router.delete('/:vote_id', (req, res) => {
		Vote.findOneAndDelete({
			_id : req.params.vote_id,
			author_id : res.locals.decoded_token.id
		})
		.then( (vote) => {
			res.status(200).json(vote);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	return router;
};
