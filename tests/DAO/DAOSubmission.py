import requests
import json
import sys
sys.path.insert(0,'..')

from utils import build_url

from logger import Logger
Logger = Logger()

class DAOSubmission:
	def __init__(self):
		pass

	def update_submission_description(self, submission):
		res = requests.put(build_url('submission/' + submission['_id']), json={"description" : submission['description']})

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))


			if obj['description'] == submission['description']:
				Logger.success('Firstame successfully update to {}.'.format(obj['description']))
				return True
			else:
				Logger.error('Firstame is {} and should be {}.'.format(obj['description'], submission['description']))
				return False

		else:
			Logger.error(res.content)
			return False

	def delete_submission(self, submission):
		res = requests.delete(build_url('submission/' + submission['_id']))

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			Logger.success('submission deleted')
			return True
		else:
			Logger.error(res.content)
			return False
