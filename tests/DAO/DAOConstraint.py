import requests
import sys
sys.path.insert(0,'..')

from utils import build_url

from logger import Logger
Logger = Logger()

class DAOConstraint:
	def __init__(self):
		pass

	def create_constraint(self, constraint, headers):

		# Post the request
		res = requests.post(build_url('constraint'), json = constraint, headers = headers)
		Logger.success('Status code : {}'.format(res.status_code)) if res.status_code == 200 else Logger.error('Status code : {}'.format(res.status_code))

		# Constraint created
		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			constraint['_id'] = obj['_id']
			Logger.success('Constraint created id : ' + constraint['_id'])
			return True

		# Constraint post failed
		elif res.status_code == 500:
			Logger.error(res.json())

		else:
			Logger.error(res.text)

		return False

	def update_constraint_description(self, constraint, headers):
		res = requests.put(build_url('constraint/' + constraint['_id']), json = {"description" : constraint['description']}, headers = headers)
		Logger.success('Status code : {}'.format(res.status_code)) if res.status_code == 200 else Logger.error('Status code : {}'.format(res.status_code))

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))

			if obj['description'] == constraint['description']:
				Logger.success('Description successfully update to {}.'.format(obj['description']))
				return True
			else:
				Logger.error('Description is "{}" and should be "{}".'.format(obj['description'], constraint['description']))
				return False

			Logger.success('Constraint updated')
			return True
		else:
			Logger.error(res.content)
			return False

	def delete_constraint(self, constraint, headers):
		res = requests.delete(build_url('constraint/' + constraint['_id']), headers = headers)
		Logger.success('Status code : {}'.format(res.status_code)) if res.status_code == 200 else Logger.error('Status code : {}'.format(res.status_code))

		if res.status_code == 200:
			Logger.info(str(res.json()))
			Logger.success('Constraint deleted')
			return True
		else:
			Logger.error(res.content)
			return False

	def delete_all_constraints_from_user_id(self, constraint, headers):
		res = requests.delete(build_url('constraint', params = 'author_id={}'.format(constraint['author_id'])), headers = headers)
		Logger.success('Status code : {}'.format(res.status_code)) if res.status_code == 200 else Logger.error('Status code : {}'.format(res.status_code))

		if res.status_code == 200:
			Logger.info(str(res.json()))
			Logger.success('Constraints deleted')
			return True
		else:
			Logger.error(res.content)
			return False
