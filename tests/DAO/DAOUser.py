import requests
import json
import sys
sys.path.insert(0,'..')

from utils import build_url

from logger import Logger
Logger = Logger()

class DAOUser:
	def __init__(self):
		pass

	def register_with_bad_parameter(self, user):

		# Post the request
		res = requests.post(build_url('user/register'), json = user)
		Logger.success('Status code : {}'.format(res.status_code)) if res.status_code == 200 else Logger.error('Status code : {}'.format(res.status_code))
		# User created
		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			user['_id'] = obj['_id']
			Logger.success('User created id : ' + user['_id'])
			return True

		# User already exist
		elif res.status_code == 500:
			Logger.error(res.json())

		else:
			Logger.error(res.text)

		return False

	def connexion_get_token(self, user):
		# Post the request
		res = requests.post(build_url('user/connexion'), json = user)
		Logger.success('Status code : {}'.format(res.status_code)) if res.status_code == 200 else Logger.error('Status code : {}'.format(res.status_code))
		# User logged
		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			Logger.success('User (' + user['_id'] + ') logged and get token : ' + obj['token'])
			return obj['token']

		# User can't login
		elif res.status_code == 500:
			Logger.error(res.json())

		else:
			Logger.error(res.text)

		return False


	def update_user_firstame(self, user, headers):
		res = requests.put(build_url('user/' + user['_id']), json={"firstname" : user['firstname']}, headers = headers)
		Logger.success('Status code : {}'.format(res.status_code)) if res.status_code == 200 else Logger.error('Status code : {}'.format(res.status_code))

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))


			if obj['firstname'] == user['firstname']:
				Logger.success('Firstame successfully update to {}.'.format(obj['firstname']))
				return True
			else:
				Logger.error('Firstame is {} and should be {}.'.format(obj['firstname'], user['firstname']))
				return False

		else:
			Logger.error(res.content)
			return False

	def get_user_by_id(self, user, headers):
		res = requests.get(build_url('user/' + user['_id']), headers = headers)
		Logger.success('Status code : {}'.format(res.status_code)) if res.status_code == 200 else Logger.error('Status code : {}'.format(res.status_code))

		if res.status_code == 200:
			Logger.success(str(res.json()))
			return True
		else:
			Logger.error(res.content)
			return False

	def get_user_by_email(self, user, headers):
		res = requests.get(build_url('user/', 'email={}'.format(user['email'])), headers = headers)
		Logger.success('Status code : {}'.format(res.status_code)) if res.status_code == 200 else Logger.error('Status code : {}'.format(res.status_code))

		if res.status_code == 200:
			Logger.success(str(res.json()))
			return True
		else:
			Logger.error(res.content)
			return False

	def get_user_by_username(self, user, headers):
		res = requests.get(build_url('user/'), 'username=' + user['username'], headers = headers)
		Logger.success('Status code : {}'.format(res.status_code)) if res.status_code == 200 else Logger.error('Status code : {}'.format(res.status_code))

		if res.status_code == 200:
			Logger.success(str(res.json()))
			return True
		else:
			Logger.error(res.content)
			return False

	def delete_user(self, user, headers):
		res = requests.delete(build_url('user/' + user['_id']), headers = headers)
		Logger.success('Status code : {}'.format(res.status_code)) if res.status_code == 200 else Logger.error('Status code : {}'.format(res.status_code))

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			Logger.success('User deleted')
			return True
		else:
			Logger.error(res.content)
			return False
