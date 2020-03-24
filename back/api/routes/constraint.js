const express    = require('express');
const router     = express.Router();

const User       = require('../../models/user');
const Constraint = require('../../models/constraint');

const check_db_exists = require('../../services/check_db_exists');
const deepsearch      = require('../../config/deepsearch');

module.exports = () => {

	/**
	 * Get all constraints
	 */
	router.get('/', (req, res) => {

		let filter = {};

		if(req.query.title) filter.title         = req.query.title;
		if(req.query.author_id) filter.author_id = req.query.author_id;

		Constraint.find(filter)
		.populate((req.query.deepsearch == 'true') ? deepsearch.author : null)
		.then( (constraints) => {
			res.status(200).json(constraints);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Get a specific constraint
	 */
	router.get('/:constraint_id', (req, res) => {
		Constraint.findById(req.params.constraint_id)
		.populate((req.query.deepsearch == 'true') ? deepsearch.author : null)
		.then( (constraint) => {
			res.status(200).json(constraint);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	/**
	 * Create a new constraint
	 */
	router.post('/', (req, res) => {

		Promise.all([check_db_exists(User, req.body.author_id)]) /* Check if user exist*/
		.then( (values) => {
			/* If all check are OK*/
			 if(!values.includes(false)){

				/* Create and save Constraint Object */
				let constraint = new Constraint(req.body);

				constraint.save()
				.then( (constraint) => {
					res.status(200).json(constraint);
				})
				.catch( (err) => {
					res.status(500).json(err);
				});

			} else {
				res.status(403).json( { error : `Tyaco server refuse to create this Constraint because the user (${req.body.author_id}) doesn\'t exist.` } );
			}
		})
		.catch( (reject) => { res.status(500).json(reject); });
	});

	/**
	 * Edit a specific contraints
	 */
	router.put('/:constraint_id', (req, res) => {
		// TODO : Title can't be edit except by an admin
		Constraint.findByIdAndUpdate(req.params.constraint_id, req.body)
		 .then( (constraint) => {
			res.status(200).json(constraint);
		})
		.catch( (err) => {
			res.status(500).json(err);
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
			Constraint.deleteMany(filter)
			.then( (constraints) => {
				res.status(200).json(constraints);
			})
			.catch( (err) => {
				res.status(500).json(err);
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
		Constraint.findByIdAndDelete(req.params.constraint_id)
		.then( (constraint) => {
			res.status(200).json(constraint);
		})
		.catch( (err) => {
			res.status(500).json(err);
		});
	});

	return router;
};
