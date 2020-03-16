const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  firstname : {
    type : String,
    required : false
  },
  lastname : {
    type : String,
    required : false
  },

  create_date: {
    type: Date,
    default: Date.now
    }
}, { versionKey : false });

// Export User model
let User = module.exports = mongoose.model('User', UserSchema, 'user');

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}
