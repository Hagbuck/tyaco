import sys
sys.path.insert(0,'..')

from logger import Logger
Logger = Logger()

from scenario.Scenario import Scenario

from DAO.DAOUser import DAOUser

class UserCreationEditionDeletion(Scenario):
	def __init__(self):
		super().__init__()

	def execute(self):
		dao_user = DAOUser()

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

		super().print_execute_title()

		self.execute_use_case(dao_user.register_with_bad_parameter, user, exit_on_fail = True)
		headers['token'] = self.execute_use_case(dao_user.connexion_get_token, user, exit_on_fail = True)

		user['firstname'] = 'Paul'
		self.execute_use_case(dao_user.update_user_firstame, user, headers)
		self.execute_use_case(dao_user.get_user_by_id, user, headers)
		self.execute_use_case(dao_user.get_user_by_email, user, headers)
		self.execute_use_case(dao_user.get_user_by_username, user, headers)
		self.execute_use_case(dao_user.delete_user, user, headers)

		super().print_execute_ending()
