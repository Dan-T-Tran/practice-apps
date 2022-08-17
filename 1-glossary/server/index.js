require("dotenv").config();
const express = require("express");
const path = require("path");

const {postWord, searchWord, updateWord, deleteWord} = require('./db.js');

const app = express();

app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

//If not using express.json, maybe try stringifying data client-side before sending to server?

app.post('/glossary', (req, res) => {
  postWord({word: req.body.word, definition: req.body.definition},
    (err, response) => {
      if (err) {
        console.error(err);
        res.send('error');
      } else if (response === 'word already saved') {
        res.send('word already saved');
      } else {
        console.log('word saved!');
        res.send('word saved');
      }
    });
});

app.get('/glossary', (req, res) => {
  searchWord(req.query, (err, response) => {
    if (err) {
      console.error(err);
      res.send({error: true});
    } else {
      console.log(response);
      res.send(response);
    }
  });
});

app.put('/glossary', (req, res) => {

});

app.delete('/glossary', (req, res) => {

});


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
