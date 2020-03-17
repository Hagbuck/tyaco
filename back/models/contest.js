const mongoose = require('mongoose');

const ContestSchema = mongoose.Schema({
	title : {
		type : String,
		required : true
	},
	description : {
		type : String,
		required : true
	},
	constraints : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Constraint'
	}],
	submission_cloture_date : {
		type : Date
	},
	is_open : {
		type : Boolean,
		default : true
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

// Export Contest model
let Contest = module.exports = mongoose.model('Contest', ContestSchema, 'contest');

module.exports.get = function (callback, limit) {
	Contest.find(callback).limit(limit);
}
