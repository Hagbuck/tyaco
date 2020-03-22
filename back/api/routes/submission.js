const express    = require('express');
const router     = express.Router();
const Submission = require('../../models/submission');
const Comment    = require('../../models/comment');

module.exports = () => {

	/**
	 * Get the comments associated with the submission
	 */
	router.get('/:submission_id/comment', (req, res) => {
		let filter = { submission_id : req.params.submission_id };

		Comment.find(filter)
		.then( (comments) => {
			res.status(200).json(comments);
		})
		.catch( (err) => {
			res.status(500).json(err);
		})
	});

	/**
	 * Add a new comment to a submission
	 */
	router.post('/:submission_id/comment', (req, res) => {
		let item = req.body;
		// Check if the JSON item contain the submission_id, otherwise, specify it with the URL
		if(!item.submission_id) item.submission_id = req.params.submission_id;

		let comment = new Comment(item);

		comment.save()
		.then( (comment) => {
			res.status(200).json(comment);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Edit a submission
	 */
	router.put('/:submission_id', (req, res) => {
		Submission.findByIdAndUpdate(req.params.submission_id, req.body)
		.then( (submission) => {
			res.status(200).json(submission);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Remove a submission
	 */
	router.delete('/:submission_id', (req, res) => {
		Submission.findByIdAndDelete(req.params.submission_id, req.body)
		.then( (submission) => {
			res.status(200).json(submission);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	return router;
};
