const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/tyaco', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) throw err;
  });
}
