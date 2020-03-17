const express = require('express');
const router  = express.Router();
const Constraint = require('../../models/constraint');

module.exports = () => {

	/**
	 * Get all constraints
	 */
	router.get('/', (req, res) => {

		let filter = {};

		if(req.query.title) filter.title         = req.query.title;
		if(req.query.author_id) filter.author_id = req.query.author_id;

		Constraint.find(filter, (err, constraints) => {
			if(err) res.status(500).json(err);
			else res.status(200).json(constraints);
		});
	});

	/**
	 * Get a specific constraint
	 */
	router.get('/:constraint_id', (req, res) => {
		Constraint.findOne({ _id : req.params.constraint_id }, (err, constraint) => {
			if(err) res.status(500).json(err);
			else res.status(200).json(constraint);
		});
	});

	/**
	 * Create a new constraint
	 */
	router.post('/', (req, res) => {
		let constraint = new Constraint(req.body);
		constraint.save((err, constraint) => {
			if(err) res.status(500).json(err);
			else res.status(200).json(constraint);
		});
	});

	/**
	 * Edit a specific contraints
	 */
	router.put('/:constraint_id', (req, res) => {
		// TODO : Title can't be edit except by an admin
		Constraint.updateOne({ _id : req.params.constraint_id }, req.body, (err, constraint) => {
			if(err) res.status(500).json(err);
			else res.status(200).json(constraint);
		});
	});

	/**
	 * Delete many constraints
	 */
	router.delete('/', (req, res) => {

		let filter = {};

		if(req.query.title) filter.title         = req.query.title;
		if(req.query.author_id) filter.author_id = req.query.author_id;

		if(filter.title || filter.author_id){
			Constraint.deleteMany(filter, (err, constraints) => {
				if(err) res.status(500).json(err);
				else res.status(200).json(constraints);
			});
		} else {
			res.status(401).json({error : 'title or author_id parameter should be passed !'});
		}
	});

	/**
	 * Delete a specific contraints
	 */
	router.delete('/:constraint_id', (req, res) => {
		// TODO : Only if any contest linked to it
		Constraint.deleteOne({ _id : req.params.constraint_id }, (err, constraint) => {
			if(err) res.status(500).json(err);
			else res.status(200).json(constraint);
		});
	});

	return router;
};
