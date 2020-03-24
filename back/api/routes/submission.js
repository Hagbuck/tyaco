const express = require('express');
const router  = express.Router();

const User       = require('../../models/user');
const Submission = require('../../models/submission');
const Comment    = require('../../models/comment');
const Vote       = require('../../models/vote');

const check_db_exists = require('../../services/check_db_exists');
const deepsearch      = require('../../config/deepsearch');

module.exports = () => {

	/**
	 * Get the comments associated with the submission
	 */
	router.get('/:submission_id/comment', (req, res) => {
		let filter = { submission_id : req.params.submission_id };

		Comment.find(filter)
		.populate((req.query.deepsearch == 'true') ? deepsearch.author : null) // Only the author should be populate. Indeed we already know for which submission we are talking about.
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

		/* Create an array of all promises to check database existence */
		let promises = [check_db_exists(User, item.author_id),			/* User check */
						check_db_exists(Submission, item.submission_id)	/* Submission check */
					   ];

		Promise.all(promises)
		.then( (values) => {
			/* If all check are OK*/
			if(!values.includes(false)){
				/* Create and save Submission Object */
				let comment = new Comment(item);

				comment.save()
				.then( (comment) => {
					res.status(200).json(comment);
				})
				.catch( (err) => {
					res.status(500).json(err);
				});

			} else {
				/* Build error message */
				let err_json = {
					error : {
						message : 'Tyaco server refuse to create this Submission',
					}
				};

				if(values[0] == false) { err_json.error.user = { id : item.author_id, message : 'Doesn\'t exists into database' }; }
				if(values[1] == false) { err_json.error.submission = { id : item.submission_id, message : 'Doesn\'t exists into database' }; }

				res.status(403).json(err_json);
			}
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
		Submission.findByIdAndDelete(req.params.submission_id)
		.then( (submission) => {
			res.status(200).json(submission);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Post a vote associate to a submission
	 */
	router.post('/:submission_id/vote', (req, res) => {
		let item = req.body;
		// Check if the JSON item contain the submission_id, otherwise, specify it with the URL
		if(!item.submission_id) item.submission_id = req.params.submission_id;

		/* Create an array of all promises to check database existence */
		let promises = [check_db_exists(User, item.author_id),			/* User check */
						check_db_exists(Submission, item.submission_id)	/* Submission check */
					   ];

		Promise.all(promises)
		.then( (values) => {
			/* If all check are OK*/
			if(!values.includes(false)){
				/* Create and save Vote Object */
				let vote = new Vote(item);

				vote.save()
				.then( (v) => {
					res.status(200).json(v);
				})
				.catch( (err) => {
					res.status(500).json(err);
				});
			} else {
				/* Build error message */
				let err_json = {
					error : {
						message : 'Tyaco server refuse to create this Vote',
					}
				};

				if(values[0] == false) { err_json.error.user = { id : item.author_id, message : 'Doesn\'t exists into database' }; }
				if(values[1] == false) { err_json.error.submission = { id : item.submission_id, message : 'Doesn\'t exists into database' }; }

				res.status(403).json(err_json);
			}
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Get all votes for this submission
	*/
	router.get('/:submission_id/vote', (req, res) => {
		let filter = { submission_id : req.params.submission_id };

		Vote.find(filter)
		.populate((req.query.deepsearch == 'true') ? deepsearch.author : null) // Only the author should be populate. Indeed we already know for which submission we are talking about.
		.then( (votes) => {
			res.status(200).json(votes);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	return router;
};
