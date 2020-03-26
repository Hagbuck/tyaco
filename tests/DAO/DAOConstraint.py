import requests
import sys
sys.path.insert(0,'..')

from utils import build_url

from logger import Logger
Logger = Logger()

class DAOConstraint:
	def __init__(self):
		pass

	def create_constraint(self, constraint):

		# Post the request
		res = requests.post(build_url('constraint'), json = constraint)

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

	def update_constraint_description(self, constraint):
		res = requests.put(build_url('constraint/' + constraint['_id']), json = {"description" : constraint['description']})

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

	def delete_constraint(self, constraint):
		res = requests.delete(build_url('constraint/' + constraint['_id']))

		if res.status_code == 200:
			Logger.info(str(res.json()))
			Logger.success('Constraint deleted')
			return True
		else:
			Logger.error(res.content)
			return False

	def delete_all_constraint_from_user_id(self, constraint):
		res = requests.delete(build_url('constraint', params = 'author_id={}'.format(constraint['author_id'])))

		if res.status_code == 200:
			Logger.info(str(res.json()))
			Logger.success('Constraints deleted')
			return True
		else:
			Logger.error(res.content)
			return False
