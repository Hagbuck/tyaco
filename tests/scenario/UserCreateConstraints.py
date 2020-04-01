import sys
sys.path.insert(0,'..')

from logger import Logger
Logger = Logger()

from scenario.Scenario import Scenario

from DAO.DAOConstraint import DAOConstraint
from DAO.DAOUser import DAOUser

class UserCreateConstraints(Scenario):
	def __init__(self):
		super().__init__()

	def execute(self):

		dao_user       = DAOUser()
		dao_constraint = DAOConstraint()

		super().print_execute_title()

		user = {
			"username": "TyacoUser",
			"password" : "123Soleil",
			"email" : "tyaco.test@hackug.fr",
			"firstname" : "Anthony",
			"lastname" : "Vuillemin",
			"bad" : "bad"
		}

		headers = {
			"token" : "bad123"
		}

		constraint = {
			"title" : "My testing contraint",
			"description" : "This is an amazing description"
		}

		constraint2 = {
			"title" : "My second testing contraint",
			"description" : "This is an amazing description"
		}

		self.execute_use_case(dao_user.register_with_bad_parameter, user, exit_on_fail = True)
		headers['token'] = self.execute_use_case(dao_user.connexion_get_token, user, exit_on_fail = True)

		constraint['author_id'] = user['_id']
		constraint2['author_id'] = user['_id']
		self.execute_use_case(dao_constraint.create_constraint, constraint, headers)

		constraint['description'] = 'New description'
		self.execute_use_case(dao_constraint.update_constraint_description, constraint, headers)
		self.execute_use_case(dao_constraint.delete_constraint, constraint, headers)

		self.execute_use_case(dao_constraint.create_constraint, constraint, headers)
		self.execute_use_case(dao_constraint.create_constraint, constraint2, headers)
		self.execute_use_case(dao_constraint.delete_all_constraints_from_user_id, constraint, headers)

		self.execute_use_case(dao_user.delete_user, user, headers)

		super().print_execute_ending()
