const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/glossary', {useNewUrlParser: true, useUnifiedTopology: true});
// // Maybe change port number if necessary
// // Maybe change /test if necessary

const wordSchema = new mongoose.Schema({
  word: String,
  definition: String
});

const Word = mongoose.model('Words', wordSchema);

module.exports = {
  postWord: function() {

  },

  searchWord: function() {

  },

  updateWord: function() {

  },

  deleteWord: function() {

  }
};

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them
