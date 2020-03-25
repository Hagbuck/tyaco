import requests
import sys
sys.path.insert(0,'..')

from utils import build_url
from logger import Logger
Logger = Logger()

class Constraint:
	def __init__(self):
		self._id = 'no_id'
		self.title = 'TestConstraint'
		self.description = 'This is a test constraint'
		self.author_id = 'no_id'


	def create_constraint(self):
		constraint = {
			"title" : self.title,
			"description" : self.description,
			"author_id" : self.author_id,
			"bad" : "bad" # This is the bad parameter, should be ignore by the backend
		}

		# Post the request
		res = requests.post(build_url('constraint'), json = constraint)

		# Constraint created
		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			self._id = obj['_id']
			Logger.success('Constraint created id : ' + self._id)
			return True

		# Constraint post failed
		else:
			Logger.error(str(res.json()))

		return False

	def update_constraint(self, description):
		res = requests.put(build_url('constraint/' + self._id), json = {"description" : description})

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			Logger.success('Constraint updated')
			return True
		else:
			Logger.error(res.content)
			return False

	def delete_constraint(self):
		res = requests.delete(build_url('constraint/' + self._id))

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			Logger.success('Constraint deleted')
			return True
		else:
			Logger.error(res.content)
			return False

	def delete_all_constraint_from_user_id(self):
		res = requests.delete(build_url('constraint', params = 'author_id={}'.format(self.author_id)))

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			Logger.success('Constraints deleted')
			return True
		else:
			Logger.error(res.content)
			return False
