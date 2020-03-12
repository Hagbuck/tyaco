db.createCollection('user');
db.createCollection('constraint');
db.createCollection('contest');
db.createCollection('submission');
db.createCollection('comment');

db.user.save({"username" : "Chef", "password" : "chef", "email" : "anthony.vuillemin@outlook.fr", "firstname" : "Anthony", "lastname" : "Vuillemin"});