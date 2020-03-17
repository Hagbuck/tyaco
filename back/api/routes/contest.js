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


		Contest.find(filter, (err, contests) => {
			if(err) res.status(500).json(err);
			else res.status(200).json(contests);
		});
	});

	/**
	 * Get a specific contest
	 */
	router.get('/:contest_id', (req, res) => {
		Contest.find({ _id : req.params.contest_id }, (err, contests) => {
			if(err) res.status(500).json(err);
			else res.status(200).json(contests);
		});
	});

	/**
	 * Create a new contest
	 */
	router.post('/', (req, res) => {
		let contest = new Contest(req.body);
		contest.save((err, contest) => {
			if(err) res.status(500).json(err);
			else res.sendStatus(200);
		});
	});

	/**
	 * Edit a specific contest
	 */
	router.put('/:contest_id', (req, res) => {
		Contest.updateOne({ _id : req.params.contest_id }, req.body, (err, contest) => {
			if(err) res.status(500).json(err);
			else res.status(200).json(contest);
		});
	});

	/**
	 * Delete a specific contest
	 */
	router.delete('/:contest_id', (req, res) => {
		Contest.deleteOne({ _id : req.params.contest_id }, req.body, (err, constraint) => {
			if(err) res.status(500).json(err);
			else res.status(200).json(constraint);
		});
	});

	/**
	 * Submit a submission for a specific contest
	 */
	router.post('/:contest_id/submission', (req, res) => {

	});

	return router;
};
