const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/glossary', {useNewUrlParser: true, useUnifiedTopology: true});
// // Maybe change port number if necessary
// // Maybe change /test if necessary

const wordSchema = new mongoose.Schema({
  word: String,
  definition: String
});

let Word = mongoose.model('Words', wordSchema);

module.exports = {
  postWord: function(query, callback) {
    let newWord = new Word(query);
    let word = {word: query.word};

    Word.find(word, (err, document) => {
      if (err) {
        callback(err);
      } else if (document.length === 0) {
        // console.log('saving...')
        newWord.save((err, document) => {
          if (err) {
            callback(err);
          } else {
            callback(null, 'word saved');
          }
        })
      } else {
        callback(null, 'word already saved');
        // console.log('word already saved');
      }
    })
  },

  searchWord: function(query) {

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
