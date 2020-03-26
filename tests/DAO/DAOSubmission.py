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
				Logger.success('Description successfully update to {}.'.format(obj['description']))
				return True
			else:
				Logger.error('Description is {} and should be {}.'.format(obj['description'], submission['description']))
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

	def comment_submission(self, comment):
		# Post the request
		res = requests.post(build_url('submission/{}/comment'.format(comment['submission_id'])), json = comment)

		# Comment created
		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			comment['_id'] = obj['_id']
			Logger.success('Comment created id : ' + comment['_id'])
			return True

		# Constraint post failed
		elif res.status_code == 500:
			Logger.error(res.json())

		else:
			Logger.error(res.text)

		return False

	def get_all_comment_for_a_submission(self, submission):
		res = requests.get(build_url('submission/{}/comment'.format(user['_id'])))

		if res.status_code == 200:
			Logger.success(str(res.json()))
			return True
		else:
			Logger.error(res.content)
			return False
