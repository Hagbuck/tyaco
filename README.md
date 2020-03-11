# What is Tyaco ?

**Tyaco (Train Yourself And Challenge Others)** is a software that provide challenges regularly

# Features to implements and API entryPoints

* User
	* Register : **[POST] /register**
	* Get Token / Login : **[GET] /connexion**
	* Update : **[PUT] /user/:user_id**
	* Delete : **[DELETE] /user/:user_id**
	* Get an user : **[GET] /user/:user_id**
	* List users : **[GET] /user**

* Contest
	* Your own
		* Create : **[POST] /contest**
			* Specify evaluation mode
				* TopLike
				* Juries
					* Add user as jury
				* *(MayBe) can add Tournament parameter for the evaluation mode (could also be evaluated by TopLike or Juries)*
			* Add constraint(s) (manualy / random)
		* Update : **[PUT] /contest/:contest_id**
		* Submit : **[POST] /contest/:contest_id/submission**
	* Auto Generate (Daily, weekly, monthly) (evaluation mode : TopLike) Can be edited by admin
		* Update : **[PUT] /contest/:contest_id**
		* Delete : **[DELETE] /contest/:contest_id**
	* Get a contest : **[GET] /contest/:contest_id**
	* List all contests : **[GET] /contest**

* Constraint management
	* Create : **[POST] /constraint**
	* Update : **[PUT] /constraint/:contraint_id**
	* Delete : **[DELETE] /constraint/:contraint_id**
	* Get a contraint : **[GET] /constraint/:contraint_id**
	* Get all contraints : **[GET] /constraint**

* Submission management
	* Edit : **[PUT] /submission/:submission_id**
	* Delete : **[DELETE] /submission/:submission_id**

* Comment management
	* Create : **[POST] /submission/:submission_id/comment**
		* (optionnal parameter) answer_to
	* Edit : **[PUT] /comment/:comment_id**
	* Remove : **[DELETE] /comment/:comment_id**
	* Get all comment for a submission : **[GET] /submission/:submission_id/comment**

## User item

```json
{
	"username": "string",
	"password" : "string",
	"email" : "string",

	"firstname" : {
		"type":"string",
		"optionnal" : true
	},
	"lastname" : {
		"type":"string",
		"optionnal" : true
	}
}
```

## Contest item

```json
{
	"title" : "string",
	"open_date" : "date",
	"submission_cloture_date" : "date",

	"contributors" : [], //Liste accounts name OR ID
	"constraints" : [],  //Liste constraint ID
	
	"submissions" : []
}
```

## Submission item

```json
{
	"title" : "string",
	"author": "ID",
	"submission_date" : "date",

	"submission_link" : "string", //We don't upload any photo
	"comments" : []
}
```

## Comment item

```json
{
	"author": "ID",
	"submission_date" : "date",

	"comments" : "string"
}
```

## Constraint item

```json
{
	"title" : "string",
	"author" : "ID",
	"description" : "string"
}
```


# To Implement

* Sort by topLike on a contest
* submission and contest search
* Store photo on DD
* Jury system
* Search system with query parameter ex : /api/user/?firstname="Anthony"