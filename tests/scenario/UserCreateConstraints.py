import sys
sys.path.insert(0,'..')

from logger import Logger
Logger = Logger()

from scenario.Scenario import Scenario

from DAO.DAOUser import DAOUser
from DAO.DAOConstraint import DAOConstraint

from models.User import User
from models.Constraint import Constraint

class UserCreateConstraints(Scenario):
	def __init__(self):
		super().__init__()

	def execute(self):

		user = User()
		dao_user = DAOUser()
		constraint = Constraint()
		dao_constraint = DAOConstraint()

		super().print_execute_title()

		self.execute_use_case(dao_user.register_with_bad_parameter, user, exit_on_fail = True)
		constraint.author_id = user._id

		self.execute_use_case(dao_constraint.create_constraint, constraint)

		constraint.description = 'New description'
		self.execute_use_case(dao_constraint.update_constraint_description, constraint)
		self.execute_use_case(dao_constraint.delete_constraint, constraint)

		self.execute_use_case(dao_constraint.create_constraint, constraint)
		constraint.title += '2'
		self.execute_use_case(dao_constraint.create_constraint, constraint)
		self.execute_use_case(dao_constraint.delete_all_constraint_from_user_id, constraint)

		self.execute_use_case(dao_user.delete_user, user)

		super().print_execute_ending()
