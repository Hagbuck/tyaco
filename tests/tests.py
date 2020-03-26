import requests

from scenario.UserCreationEditionDeletion import UserCreationEditionDeletion
from scenario.UserCreateConstraints import UserCreateConstraints
from scenario.UserCreateContestAndOtherParticipate import UserCreateContestAndOtherParticipate

if __name__ == "__main__":
	#UserCreationEditionDeletion().execute()
	#UserCreateConstraints().execute()
	UserCreateContestAndOtherParticipate().execute()
