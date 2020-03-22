const mongoose = require('mongoose');

const VoteSchema = mongoose.Schema({

	submission_id : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Submission',
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

// Export Vote model
let Vote = module.exports = mongoose.model('Vote', VoteSchema, 'vote');

module.exports.get = function (callback, limit) {
	Vote.find(callback).limit(limit);
}
