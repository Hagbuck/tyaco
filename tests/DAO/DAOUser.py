import requests
import sys
sys.path.insert(0,'..')

from utils import build_url

from models.User import User

from logger import Logger
Logger = Logger()

class DAOUser:
	def __init__(self):
		pass

	def register_with_bad_parameter(self, user):
		user_json = {
			"username": user.username,
			"password" : user.password,
			"email" : user.email,
			"firstname" : user.firstname,
			"lastname" : user.lastname,
			"bad" : "bad" # This is the bad parameter, should be ignore by the backend
		}

		# Post the request
		res = requests.post(build_url('user/register'), json = user_json)

		# User created
		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			user._id = obj['_id']
			Logger.success('User created id : ' + user._id)
			return True

		# User already exist
		elif res.status_code == 500:
			Logger.error(res.json())

		return False

	def update_user_firstame(self, user):
		res = requests.put(build_url('user/' + user._id), json={"firstname" : user.firstname})

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))


			if obj['firstname'] == user.firstname:
				Logger.success('Firstame successfully update to {}.'.format(obj['firstname']))
				return True
			else:
				Logger.error('Firstame is {} and should be {}.'.format(obj['firstname'], user.firstname))
				return False

		else:
			Logger.error(res.content)
			return False

	def get_user_by_id(self, user):
		res = requests.get(build_url('user/' + user._id))

		if res.status_code == 200:
			Logger.success(str(res.json()))
			return True
		else:
			Logger.error(res.content)
			return False

	def get_user_by_email(self, user):
		res = requests.get(build_url('user/', 'email={}'.format(user.email)))

		if res.status_code == 200:
			Logger.success(str(res.json()))
			return True
		else:
			Logger.error(res.content)
			return False

	def get_user_by_username(self, user):
		res = requests.get(build_url('user/'), 'username=' + user.username)

		if res.status_code == 200:
			Logger.success(str(res.json()))
			return True
		else:
			Logger.error(res.content)
			return False

	def delete_user(self, user):
		res = requests.delete(build_url('user/' + user._id))

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			Logger.success('User deleted')
			return True
		else:
			Logger.error(res.content)
			return False
