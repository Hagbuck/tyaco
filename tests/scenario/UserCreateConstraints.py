import sys
sys.path.insert(0,'..')

from logger import Logger
Logger = Logger()

from scenario.Scenario import Scenario

from models.User import User
from models.Constraint import Constraint

class UserCreateConstraints(Scenario):
	def __init__(self):
		super().__init__()

		self.user = User()
		self.constraint = Constraint()

	def execute(self):

		super().print_execute_title()

		self.execute_use_case(self.user.register_with_bad_parameter, exit_on_fail = True)
		self.constraint.author_id = self.user._id
		self.constraint.author_id = self.user._id
		self.constraint.author_id = self.user._id

		self.execute_use_case(self.constraint.create_constraint)
		self.execute_use_case(self.constraint.update_constraint, 'New description')
		self.execute_use_case(self.constraint.delete_constraint)

		self.execute_use_case(self.constraint.create_constraint)

		self.constraint.title += '2'
		self.execute_use_case(self.constraint.create_constraint)
		self.execute_use_case(self.constraint.delete_all_constraint_from_user_id)

		self.execute_use_case(self.user.delete_user)

		super().print_execute_ending()
