require("dotenv").config();
const express = require("express");
const path = require("path");

const {postWord, searchWord, updateWord, deleteWord} = require('./db.js');

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

//If not using express.json, maybe try stringifying data client-side before sending to server?

app.post('/glossary', (req, res) => {

});

app.get('/glossary', (req, res) => {

});

app.put('/glossary', (req, res) => {

});

app.delete('/glossary', (req, res) => {

});


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
