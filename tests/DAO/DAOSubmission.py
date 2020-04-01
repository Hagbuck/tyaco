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

	def update_submission_description(self, submission, headers):
		res = requests.put(build_url('submission/' + submission['_id']), json={"description" : submission['description']}, headers = headers)

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

	def delete_submission(self, submission, headers):
		res = requests.delete(build_url('submission/' + submission['_id']), headers = headers)

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			Logger.success('submission deleted')
			return True
		else:
			Logger.error(res.content)
			return False

	def comment_submission(self, comment, headers):
		# Post the request
		res = requests.post(build_url('submission/{}/comment'.format(comment['submission_id'])), json = comment, headers = headers)

		# Comment created
		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			comment['_id'] = obj['_id']
			Logger.success('Comment created id : ' + comment['_id'])
			return True

		# Comment post failed
		elif res.status_code == 500:
			Logger.error(res.json())

		else:
			Logger.error(res.text)

		return False

	def vote_submission(self, vote, headers):
		# Post the request
		res = requests.post(build_url('submission/{}/vote'.format(vote['submission_id'])), json = vote, headers = headers)

		# Vote created
		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			vote['_id'] = obj['_id']
			Logger.success('Vote created id : ' + vote['_id'])
			return True

		# Vote post failed
		elif res.status_code == 500:
			Logger.error(res.json())

		else:
			Logger.error(res.text)

		return False

	def get_all_comment_for_a_submission(self, submission, headers):
		res = requests.get(build_url('submission/{}/comment'.format(user['_id'])), headers = headers)

		if res.status_code == 200:
			Logger.success(str(res.json()))
			return True
		else:
			Logger.error(res.content)
			return False
