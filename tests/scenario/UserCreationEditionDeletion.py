import sys
sys.path.insert(0,'..')

from logger import Logger
Logger = Logger()

from scenario.Scenario import Scenario

from DAO.DAOUser import DAOUser
from models.User import User

class UserCreationEditionDeletion(Scenario):
	def __init__(self):
		super().__init__()

	def execute(self):

		user = User()
		dao_user = DAOUser()

		super().print_execute_title()

		self.execute_use_case(dao_user.register_with_bad_parameter, user, exit_on_fail = True)

		user.firstname = 'Paul'
		self.execute_use_case(dao_user.update_user_firstame, user)
		self.execute_use_case(dao_user.get_user_by_id, user)
		self.execute_use_case(dao_user.get_user_by_email, user)
		self.execute_use_case(dao_user.get_user_by_username, user)
		self.execute_use_case(dao_user.delete_user, user)

		super().print_execute_ending()
