const express = require('express');
const router  = express.Router();

const User       = require('../../models/user');
const Constraint = require('../../models/constraint');
const Contest    = require('../../models/contest');
const Submission = require('../../models/submission');

const check_db_exists = require('../../services/check_db_exists');
const deepsearch      = require('../../config/deepsearch');

module.exports = () => {

	/**
	 * Get all contests
	 */
	router.get('/', (req, res) => {
		let filter = {};

		if(req.query.title) filter.title         = req.query.title;
		if(req.query.is_open) filter.is_open     = req.query.is_open;
		if(req.query.author_id) filter.author_id = req.query.author_id;

		Contest.find(filter)
		.populate((req.query.deepsearch == 'true') ? deepsearch.author : null)
		.populate((req.query.deepsearch == 'true') ? deepsearch.constraint : null)
		.then( (contests) => {
			res.status(200).json(contests);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Get a specific contest
	 */
	router.get('/:contest_id', (req, res) => {
		Contest.findById(req.params.contest_id)
		.populate((req.query.deepsearch == 'true') ? deepsearch.author : null)
		.populate((req.query.deepsearch == 'true') ? deepsearch.constraint : null)
		.then( (contests) => {
			res.status(200).json(contests);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Create a new contest
	 */
	router.post('/', (req, res) => {

		/* Create an array of all promsie to check database existence */
		let promises = [check_db_exists(User, req.body.author_id)];
		req.body.constraints_id.forEach((constraint_id) => { promises.push(check_db_exists(Constraint, constraint_id)); });

		Promise.all(promises)
		.then( (values) => {
			/* If all check are OK*/
			if(!values.includes(false)){
				/* Create and save Contest Object */
				let contest = new Contest(req.body);

				contest.save()
				.then( (contest) => {
					res.status(200).json(contest);
				})
				.catch( (err) => {
					res.status(500).json(err);
				});
			} else {

				/* Build error message */
				let err_json = {
					error : {
						message : 'Tyaco server refuse to create this Contest',
					}
				};

				/* Get All ids which aren't in the database from the values array : */
				let err_idx = values.map((e, i) => e === false ? i : -1).filter(index => index !== -1);

				err_idx.forEach( (i) => {
					if(i == 0) { err_json.error.user = { id : req.body.author_id, message : 'Doesn\'t exists into database' }; }
					else {
						if(!Array.isArray(err_json.error.constraints))
							err_json.error.constraints = [];

						err_json.error.constraints.push({
							id : req.body.constraints_id[i - 1], /* Because the first element of the array is the user */
							message : 'Doesn\'t exists into database'
						});
					}
				});

				res.status(403).json(err_json);
			}
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Edit a specific contest
	 */
	router.put('/:contest_id', (req, res) => {
		Contest.findByIdAndUpdate(req.params.contest_id, req.body)
		.then( (contest) => {
			res.status(200).json(contest);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Delete a specific contest
	 */
	router.delete('/:contest_id', (req, res) => {
		Contest.findByIdAndDelete(req.params.contest_id)
		.then( (contest) => {
			res.status(200).json(contest);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Submit a submission for a specific contest
	 */
	router.post('/:contest_id/submission', (req, res) => {
		let item = req.body;
		// Check if the JSON item contain the contest_id, otherwise, specify it with the URL
		if(!item.contest_id) item.contest_id = req.params.contest_id;

		/* Create an array of all promises to check database existence */
		let promises = [check_db_exists(User, item.author_id),		/* User check */
						check_db_exists(Contest, item.contest_id)	/* Contest check */
					   ];

		Promise.all(promises)
		.then( (values) => {
			/* If all check are OK*/
			if(!values.includes(false)){
				/* Create and save Submission Object */
				let submission = new Submission(item);

				submission.save()
				.then( (submission) => {
					res.status(200).json(submission);
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
				if(values[1] == false) { err_json.error.contest = { id : item.contest_id, message : 'Doesn\'t exists into database' }; }

				res.status(403).json(err_json);
			}
		})
		.catch( (err) => {
			res.status(500).json(err);
		});

	});

	/**
	 * Get all submissions from a contest
	 */
	 router.get('/:contest_id/submission', (req, res) => {
		 let filter = { contest_id : req.params.contest_id };

		 Submission.find(filter)
		.populate((req.query.deepsearch == 'true') ? deepsearch.contest : null)
		.populate((req.query.deepsearch == 'true') ? deepsearch.author : null)
		.then( (submissions) => {
			res.status(200).json(submissions);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	return router;
};
