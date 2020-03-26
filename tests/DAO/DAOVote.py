import requests
import json
import sys
sys.path.insert(0,'..')

from utils import build_url

from logger import Logger
Logger = Logger()

class DAOVote:
	def __init__(self):
		pass

	def delete_vote(self, vote):
		res = requests.delete(build_url('vote/' + vote['_id']))

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			Logger.success('Vote deleted')
			return True
		else:
			Logger.error(res.content)
			return False
