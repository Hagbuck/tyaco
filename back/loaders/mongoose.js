const mongoose = require('mongoose');

module.exports = (db_url) => {
  mongoose.connect(`mongodb://${db_url}:27017/tyaco`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
    if(err) throw err;
  });
}
