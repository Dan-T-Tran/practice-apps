require("dotenv").config();
const express = require("express");
const path = require("path");

const {postWord, searchWord, searchFlash, updateWord, deleteWord} = require('./db.js');

const app = express();

app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

//If not using express.json, maybe try stringifying data client-side before sending to server?

app.post('/glossary', (req, res) => {
  let query = {word: req.body.word, definition: req.body.definition, favorite: req.body.favorite}
  postWord(query, (err, response) => {
    if (err) {
      console.error(err);
      res.send('error');
    } else if (response === 'word already saved') {
      res.send('word already saved');
    } else {
      res.send('word saved');
    }
  });
});

app.get('/glossary', (req, res) => {
  if (req.query.flashCardMode) {
    searchFlash(req.query, (err, response) => {
      if (err) {
        console.error(err);
        res.send('error');
      } else {
        res.send(response);
      }
    })
  } else {
    searchWord(req.query, (err, response) => {
      if (err) {
        console.error(err);
        res.send('error');
      } else {
        // console.log(response);
        res.send(response);
      }
    });
  }
});

app.put('/glossary', (req, res) => {
  let query = {word: req.body.originalWord};
  let edit = {word: req.body.editWord, definition: req.body.definition, favorite: req.body.favorite};
  updateWord(query, edit, (err, response) => {
    if (err) {
      console.error(err);
      res.send('error');
    } else if (response === 'successful update') {
      res.send('success');
    } else {
      res.send('no word found');
    }
  });
});

app.delete('/glossary', (req, res) => {
  deleteWord(req.query, (err, response) => {
    if (err) {
      console.error(err);
      res.send('error');
    } else if (response === 'successful delete'){
      res.send('success');
    } else {
      res.send('no word found');
    }
  })
});


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
