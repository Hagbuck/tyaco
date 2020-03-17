const mongoose = require('mongoose');

const ConstraintSchema = mongoose.Schema({
	title : {
		type : String,
		required : true,
		unique : true
	},
	description : {
		type : String
	},
	author_id : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'User',
		required : true
	},

	create_date: {
	  type: Date,
		default: Date.now
	}
}, { versionKey : false });

// Export Constaint model
let Constraint = module.exports = mongoose.model('Constraint', ConstraintSchema, 'constraint');

module.exports.get = function (callback, limit) {
	Constraint.find(callback).limit(limit);
}
