import requests
import json
import sys
sys.path.insert(0,'..')

from utils import build_url

from logger import Logger
Logger = Logger()

class DAOComment:
	def __init__(self):
		pass

	def update_comment_comment(self, comment, headers):
		res = requests.put(build_url('comment/' + comment['_id']), json={"comment" : comment['comment']}, headers = headers)

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))


			if obj['comment'] == comment['comment']:
				Logger.success('Comment successfully update to {}.'.format(obj['comment']))
				return True
			else:
				Logger.error('Comment is {} and should be {}.'.format(obj['comment'], comment['comment']))
				return False

		else:
			Logger.error(res.content)
			return False

	def delete_comment(self, comment, headers):
		res = requests.delete(build_url('comment/' + comment['_id']), headers = headers)

		if res.status_code == 200:
			obj = res.json()
			Logger.info(str(obj))
			Logger.success('Comment deleted')
			return True
		else:
			Logger.error(res.content)
			return False
