const author = {
	path : 'author_id',
	select : '_id username email firstname lastname'
};

const constraint = {
	path : 'constraints_id',
	populate : {
		path : 'author_id',
		select : '_id username email firstname lastname'
	}
};

const contest = {
	path : 'contest_id',
	populate : [author, constraint]
};

const submission = {
	path : 'submission_id',
	populate : [author, contest]
};
1
const comment = {
	path : 'comment_id',
	populate : [author, submission]
};

module.exports.author     = author;
module.exports.constraint = constraint;
module.exports.contest    = contest;
module.exports.submission = submission;
module.exports.comment    = comment;
