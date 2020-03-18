const express = require('express');
const router  = express.Router();
const Contest = require('../../models/contest');

module.exports = () => {

	/**
	 * Get all contests
	 */
	router.get('/', (req, res) => {
		let filter = {};

		if(req.query.title) filter.title         = req.query.title;
		if(req.query.is_open) filter.is_open     = req.query.is_open;
		if(req.query.author_id) filter.author_id = req.query.author_id;


		// TODO : Populate if parameter !
		Contest.find(filter)
		.populate({
			path : 'constraints',
			populate : {
				path : 'author_id',
				select : '_id username email firstname lastname'
			}
		})
		.populate({
			path : 'author_id',
			select : '_id username email firstname lastname'
		})
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
		let contest = new Contest(req.body);

		contest.save()
		.then( (contest) => {
			res.sendStatus(200);
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
		Contest.findByIdAndDelete(req.params.contest_id, req.body)
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

	});

	return router;
};
