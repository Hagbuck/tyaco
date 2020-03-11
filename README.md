# [Tyaco] Train Yourself And Challenge Others

**Tyaco** is a software that provide challenges regularly

# Features to implements and API entryPoints

* User
	* register : **[POST] /user**
	* Update : **[PUT] /user/:user_id**
	* Delete : **[DELETE] /user/:user_id**
	* Login : **?**
	* Get user : **[GET] /user/:user_id**
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
		* Submit : **[POST] /contest/:contest_id/submit**
	* Auto Generate (Daily, weekly, monthly) (evaluation mode : TopLike) Can be edited by admin
		* Manualy create : **[POST] /contest**
		* Update : **[PUT] /contest/:contest_id**
		* Delete : **[DELETE] /contest/:contest_id**
	* Get contest : **[GET] /contest/:contest_id**
	* List all contests : **[GET] /contest**

* Constraint management
	* Create : **[POST] /constraint**
	* Update : **[PUT] /constraint/:contraint_id**
	* Delete : **[DELETE] /constraint/:contraint_id**
	* Get contraint : **[GET] /constraint/:contraint_id**
	* Get all contraints : **[GET] /constraint**

* Comment management
	* Create : **[POST] /submission/**
		* (optionnal parameter) answer_to
	* Edit 
	* Remove

## User item

```json
{
	"username": "string",
	"password" : "sha1",
	"email" : "string"
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