const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

module.exports = mongoose.connect("mongodb://0.0.0.0:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});