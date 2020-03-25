class Colors:
	PURPLE    = '\033[95m'
	OKBLUE    = '\033[94m'
	OKGREEN   = '\033[92m'
	WARNING   = '\033[93m'
	FAIL      = '\033[91m'
	ENDC      = '\033[0m'
	BOLD      = '\033[1m'
	UNDERLINE = '\033[4m'

class Logger:
	def __init__(self, enable_debug = True, enable_info = True, enable_success = True, enable_error = True):
		self.enable_debug   = enable_debug
		self.enable_info    = enable_info
		self.enable_success = enable_success
		self.enable_error   = enable_error

		# self.info('Logger loaded with debug = {}, info = {} and error = {}'.format(self.enable_debug, self.enable_info, self.enable_error))

	def debug(self, msg):
		if self.enable_debug == True:
			self.print(Colors.OKBLUE, '[DEBUG]  : {}'.format(str(msg)))

	def INFO(self, msg):
		self.info(msg, is_bold = True)

	def info(self, msg, is_bold = False):
		col = Colors.ENDC if is_bold == False else Colors.BOLD

		if self.enable_info == True:
			self.print(col, '[INFO]   : {}'.format(str(msg)))

	def success(self, msg):
		if self.enable_info == True:
			self.print(Colors.OKGREEN, '[SUCCESS]: {}'.format(str(msg)))

	def error(self, msg):
		if self.enable_error == True:
			self.print(Colors.FAIL, '[ERROR]  : {}'.format(str(msg)))

	def print(self, col, msg):
		print('{}{}{}'.format(col, msg, Colors.ENDC))
