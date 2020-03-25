import requests
import sys
sys.path.insert(0,'..')

from utils import build_url
from logger import Logger
Logger = Logger()

class User:
	def __init__(self):
		self.user_id   = 'noid'
		self.username  = 'TyacoUser'
		self.password  = "123Soleil"
		self.email     = 'tyaco.test@hackug.fr'
		self.firstname = 'Anthony'
		self.lastname  = 'Vuillemin'

	def register_with_bad_parameter(self):
		user = {
			"username": self.username,
			"password" : self.password,
			"email" : self.email,
			"firstname" : self.firstname,
			"lastname" : self.lastname,
			"bad" : "bad" # This is the bad parameter, should be ignore by the backend
		}

		# Post the request
		res = requests.post(build_url('user/register'), json = user)

		# User created
		if res.status_code == 200:
			obj = res.json()
			self.user_id = obj['_id']
			Logger.success('User created id : ' + self.user_id)
			return True

		# User already exist
		elif res.status_code == 500:
			obj = res.json()
			errmsg = obj['errmsg']
			Logger.error(errmsg)

		return False

	def update_user_firstame(self, firstname):
		res = requests.put(build_url('user/' + self.user_id), json={"firstname" : firstname})

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))


			if obj['firstname'] == firstname:
				Logger.success('Firstame successfully update to {}.'.format(obj['firstname']))
				return True
			else:
				Logger.error('Firstame is {} and should be {}.'.format(obj['firstname'], firstname))
				return False
		else:
			Logger.error(res.content)
			return False

	def get_user_by_id(self):
		res = requests.get(build_url('user/' + self.user_id))

		if res.status_code == 200:
			Logger.success(str(res.json()))
			return True
		else:
			Logger.error(res.content)
			return False

	def get_user_by_email(self):
		res = requests.get(build_url('user/', 'email=tyaco.test@hackug.fr'))

		if res.status_code == 200:
			Logger.success(str(res.json()))
			return True
		else:
			Logger.error(res.content)
			return False

	def get_user_by_username(self):
		res = requests.get(build_url('user/'), 'username=' + self.username)

		if res.status_code == 200:
			Logger.success(str(res.json()))
			return True
		else:
			Logger.error(res.content)
			return False

	def delete_user(self):
		res = requests.delete(build_url('user/' + self.user_id))

		if res.status_code == 200:
			Logger.success('User deleted')
			return True
		else:
			Logger.error(res.content)
			return False
