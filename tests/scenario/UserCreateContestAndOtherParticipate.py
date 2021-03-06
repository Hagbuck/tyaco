import sys
sys.path.insert(0,'..')

from logger import Logger
Logger = Logger()

from scenario.Scenario import Scenario

from DAO.DAOConstraint import DAOConstraint
from DAO.DAOUser import DAOUser
from DAO.DAOContest import DAOContest
from DAO.DAOSubmission import DAOSubmission
from DAO.DAOComment import DAOComment
from DAO.DAOVote import DAOVote

class UserCreateContestAndOtherParticipate(Scenario):
	def __init__(self):
		super().__init__()

	def execute(self):
		dao_user       = DAOUser()
		dao_contest    = DAOContest()
		dao_constraint = DAOConstraint()
		dao_submission = DAOSubmission()
		dao_comment    = DAOComment()
		dao_vote       = DAOVote()

		super().print_execute_title()

		user = {
			"username": "TyacoUser",
			"password" : "123Soleil",
			"email" : "tyaco.test@hackug.fr",
			"firstname" : "Anthony",
			"lastname" : "Vuillemin",
			"bad" : "bad"
		}

		user_headers = {
			"token" : "bad123"
		}

		submitter_user = {
			"username": "Submitter",
			"password" : "123Soleil",
			"email" : "submitter.tyaco.test@hackug.fr",
			"firstname" : "Paul",
			"lastname" : "Eto",
			"bad" : "bad"
		}

		submitter_headers = {
			"token" : "bad123"
		}

		submission = {
			"submission_link" : "http://localhost:2020/myAmazingPicture",
			"title" : "Under the moon",
			"description" : "Whaaaao"
		}

		constraint = {
			"title" : "My testing constraint",
			"description" : "This is an amazing description"
		}

		contest = {
			"title" : "Le concours de la Semaine !",
			"description" : "Cette semaine présenté une photo",
			"submission_cloture_date" : "2020-03-19T00:00:00.000Z",
		}

		comment = {
			"comment" : "Impressive picture ! Congratulation"
		}

		vote = {}

		# User creation
		self.execute_use_case(dao_user.register_with_bad_parameter, user, exit_on_fail = True)

		# User connexion
		user_headers['token'] = self.execute_use_case(dao_user.connexion_get_token, user, exit_on_fail = True)

		# Constraint creation
		constraint['author_id'] = user['_id']
		self.execute_use_case(dao_constraint.create_constraint, constraint, user_headers, exit_on_fail = True)

		# Contest creation
		contest['author_id'] = user['_id']
		contest['constraints_id'] = [constraint['_id']]
		self.execute_use_case(dao_contest.create_contest, contest, user_headers, exit_on_fail = True)

		# Creation second Submitter user
		self.execute_use_case(dao_user.register_with_bad_parameter, submitter_user, exit_on_fail = True)

		# Submitter connexion
		submitter_headers['token'] = self.execute_use_case(dao_user.connexion_get_token, submitter_user, exit_on_fail = True)

		# Submitter user submit for the contest
		submission['contest_id'] = contest['_id']
		submission['author_id'] = submitter_user['_id']
		self.execute_use_case(dao_contest.submit, submission, submitter_headers)

		# Submitter update is  submission description
		submission['description'] = "This is a picture of the moon"
		self.execute_use_case(dao_submission.update_submission_description, submission, submitter_headers)

		# User comment the submitter submission
		comment['author_id'] = user['_id']
		comment['submission_id'] = submission['_id']
		self.execute_use_case(dao_submission.comment_submission, comment, user_headers)

		# User update is comment
		comment['comment'] = 'Mmmmmmm, you may be should turn off the nosie canceling'
		self.execute_use_case(dao_comment.update_comment_comment, comment, user_headers)

		# Use vote the Submitter submission
		vote['author_id'] = user['_id']
		vote['submission_id'] = submission['_id']
		self.execute_use_case(dao_submission.vote_submission, vote, user_headers)

		# Full deletion
		self.execute_use_case(dao_vote.delete_vote, vote, user_headers)
		self.execute_use_case(dao_comment.delete_comment, comment, user_headers)
		self.execute_use_case(dao_submission.delete_submission, submission, submitter_headers)
		self.execute_use_case(dao_contest.delete_contest, contest, user_headers)
		self.execute_use_case(dao_constraint.delete_constraint, constraint, user_headers)
		self.execute_use_case(dao_user.delete_user, user, user_headers)
		self.execute_use_case(dao_user.delete_user, submitter_user, submitter_headers)

		super().print_execute_ending()
