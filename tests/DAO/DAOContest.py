import requests
import sys
sys.path.insert(0,'..')

from utils import build_url

from logger import Logger
Logger = Logger()

class DAOContest:
	def __init__(self):
		pass

	def create_contest(self, contest):

		# Post the request
		res = requests.post(build_url('contest'), json = contest)

		# contest created
		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			contest['_id'] = obj['_id']
			Logger.success('contest created id : ' + contest['_id'])
			return True

		# Contest post failed
		else:
			Logger.error(str(res.json()))

		return False

	def update_contest_description(self, contest):
		res = requests.put(build_url('contest/' + contest['_id']), json = {"description" : contest['description']})

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))

			if obj['description'] == contest['description']:
				Logger.success('Description successfully update to {}.'.format(obj['description']))
				return True
			else:
				Logger.error('Description is "{}" and should be "{}".'.format(obj['description'], contest['description']))
				return False

			Logger.success('contest updated')
			return True
		else:
			Logger.error(res.content)
			return False

	def delete_contest(self, contest):
		res = requests.delete(build_url('contest/' + contest['_id']))

		if res.status_code == 200:
			Logger.info(str(res.json()))
			Logger.success('contest deleted')
			return True
		else:
			Logger.error(res.content)
			return False

	def submit(self, submission):
		# Post the submit
		res = requests.post(build_url('contest/{}/submission'.format(submission['contest_id'])), json = submission)

		# Submission created
		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			submission['_id'] = obj['_id']
			Logger.success('Submission created id : ' + submission['_id'])
			return True

		# Submission post failed
		elif res.status_code == 500:
			Logger.error(res.json())

		else:
			Logger.error(res.text)

		return False
