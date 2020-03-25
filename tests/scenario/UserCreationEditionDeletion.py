import sys
sys.path.insert(0,'..')

from logger import Logger
Logger = Logger()

from scenario.Scenario import Scenario

from models.User import User

class UserCreationEditionDeletion(Scenario):
	def __init__(self):
		super().__init__()

		self.user = User()

	def execute(self):

		super().print_execute_title()

		self.execute_use_case(self.user.register_with_bad_parameter, exit_on_fail = True)
		self.execute_use_case(self.user.update_user_firstame, 'Paul')
		self.execute_use_case(self.user.get_user_by_id)
		self.execute_use_case(self.user.get_user_by_email)
		self.execute_use_case(self.user.get_user_by_username)
		self.execute_use_case(self.user.delete_user)

		super().print_execute_ending()
