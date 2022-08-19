const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/glossary', {useNewUrlParser: true, useUnifiedTopology: true});
// // Maybe change port number if necessary
// // Maybe change /test if necessary

const wordSchema = new mongoose.Schema({
  word: String,
  definition: String,
  favorite: Boolean
});

let Word = mongoose.model('Words', wordSchema);

module.exports = {
  postWord: function(query, callback) {
    let newWord = new Word(query);
    let regex = new RegExp(`^${query.word}$`, 'i');

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
    let findQuery = {}
    let regex = new RegExp(`${query.word}`, 'i');
    findQuery.word = {$regex: regex};
    if (query.showFavorites === 'true') {
      findQuery.favorite = true;
    }

    let sort = {};
    if (!query.sort) {
      sort = {};
    } else if (query.sort === 'ascending') {
      sort.sort = {word:'ascending'};
    } else {
      sort.sort = {word:'descending'};
    }



    Word.find(findQuery, null, sort, (err, documents) => {
      if (err) {
        callback(err);
      } else {
        let start = query.index * 10;
        let end = start + 10
        documentChunk = documents.slice(start, end);
        let data = {
          amount: documents.length,
          documents: documentChunk,
          remainder: documentChunk.length
        };
        callback(null, data);
      }
    })
  },

  searchFlash: function(query, callback) {
    Word.find((err, documents) => {
      if (err) {
        callback(err);
      } else {
        let data = {
          amount: documents.length,
          documents: documents,
          remainder: documents.length
        };
        callback(null, data);
      }
    })
  },

  updateWord: function(query, edit, callback) {
    Word.findOneAndUpdate(query, edit, (err, document) => {
      if (err) {
        callback(err);
      } else if (document) {
        callback(null, 'successful update');
      } else {
        callback(null, 'no word found');
      }
    })
  },

  deleteWord: function(query, callback) {
    if (query.deleteAll) {
      Word.deleteMany((err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, 'successful delete');
        }
      })
    } else {
      Word.findOneAndDelete(query, (err, document) => {
        if (err) {
          callback(err);
        } else if (document) {
          callback(null, 'successful delete');
        } else {
          callback(null, 'no word found');
        }
      })
    }
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
