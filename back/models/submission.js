const mongoose = require('mongoose');

const SubmissionSchema = mongoose.Schema({
	title : {
		type : String,
		required : true
	},
	description : {
		type : String,
		required : true
	},

	submission_link : {
		type : String,
		required : true
	},

	contest_id : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Contest',
		required : true
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

// Export Submission model
let Submission = module.exports = mongoose.model('Submission', SubmissionSchema, 'submission');

module.exports.get = function (callback, limit) {
	Submission.find(callback).limit(limit);
}
