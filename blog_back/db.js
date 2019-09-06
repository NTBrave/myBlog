const mongoose = require('mongoose')

mongoose.connect('mongodb://dlcai:09210921@localhost:27017/blog',{ useNewUrlParser: true })

mongoose.connection.on("error", function (error) {
  console.log("mongo unsuccess£º" + error);
});
mongoose.connection.on("open", function () {
  console.log("------mongo success------");
});
const userSchema = new mongoose.Schema({
  name: String,
  password: String
})

const articleSchema = new mongoose.Schema({
  title: String,
  date: String,
  content: String,
  gist: String,
  labels: Array
})

const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema)
}

module.exports = Models
