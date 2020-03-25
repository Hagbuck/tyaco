import sys
sys.path.insert(0,'..')

from logger import Logger
Logger = Logger()

class Scenario:
	def __init__(self):
		self.use_case_success = 0
		self.use_case_total   = 0

		self.__scenario_title = 'Execution of {}'.format(self.__class__.__name__)
		self.__bar_separator = '-' * len(self.__scenario_title)

	def execute_use_case(self, user_case_function, *params, exit_on_fail = False):
		Logger.INFO(self.__bar_separator)
		self.use_case_total += 1

		Logger.INFO('Start use case {} : {}'.format(self.use_case_total, user_case_function.__name__))

		success = user_case_function(*params)
		if success:
			self.use_case_success += 1
		else:
			if exit_on_fail:
				Logger.error('Blocking error. This step have to succed in order to continue the Scenario')
				exit(0)

		Logger.INFO(self.__bar_separator + '\n')

	def print_execute_title(self):
		Logger.INFO(self.__bar_separator)
		Logger.INFO(self.__scenario_title)
		Logger.INFO(self.__bar_separator + '\n')

	def print_execute_ending(self):
		Logger.INFO(self.__bar_separator)
		Logger.success('End of scenario : {} use cases passed on {}'.format(self.use_case_success, self.use_case_total))
		Logger.INFO(self.__bar_separator + '\n')
