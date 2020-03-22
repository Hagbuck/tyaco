const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
	comment : {
		type : String,
		required : true
	},

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

// Export Comment model
let Comment = module.exports = mongoose.model('Comment', CommentSchema, 'comment');

module.exports.get = function (callback, limit) {
	Comment.find(callback).limit(limit);
}
