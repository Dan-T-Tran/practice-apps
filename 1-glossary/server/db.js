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
    // let word = {word: query.word};
    let regex = new RegExp(`^${query.word}$`, 'i');
    // console.log(word);
    // console.log(regex);

    //Regex used to find word match and is case-insensitive via 'i'
    //Will only find exact match from start of string, will ignore past the query

    Word.find({word: {$regex: regex}}, (err, document) => {
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

  searchWord: function(query, callback) {
    if (query.word) {
      // console.log('there is a word')
      let regex = new RegExp(`${query.word}`, 'i');
      Word.find({word: {$regex: regex}}, (err, documents) => {
        if (err) {
          callback(err);
        } else {
          callback(null, documents);
        }
      })
    } else {
      // console.log('there is no word')
      Word.find((err, documents) => {
        if (err) {
          callback(err);
        } else {
          callback(null, documents);
        }
      })
    }
  },

  updateWord: function() {

  },

  deleteWord: function() {

  }
};

  //update and delete shouldn't need regex since they're pulling the name directly from buttons


/*
REGEX SETUP EXAMPLE FOR MONGODB:
    var wordy = 'cat'
    let check = new RegExp(`^${wordy}`, 'i');
    console.log(typeof check);
    console.log(check);

*/

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them
