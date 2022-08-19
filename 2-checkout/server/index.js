require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/checkout/:sessionId', (req, res) => {
  console.log(req.params.sessionId);
  let getParams = `SELECT session_id FROM responses WHERE session_id = ?`;
  let postParams = `INSERT INTO responses (session_id) VALUES (?)`;
  // console.log(req);
  // console.log(req);
  // console.log(req.session_id);
  // console.log(typeof req.session_id); //string
  db.query(getParams, req.params.sessionId, (err, response) => {
    if (err) {
      console.error(err);
      res.send('error');
    } else {
      if (response.length === 0) {
        db.query(postParams, req.params.sessionId, (err, response) => {
          if (err) {
            console.error(err);
            res.send('error');
          } else {
            // console.log(response);
            res.send('new session');
          }
        })
      } else {
        res.send('revisiting session');
      }
    }
  })
});

app.post('/checkout/first', (req, res) => {
  console.log(req.body);
  //req.body.password would have to be assigned a hashed version before saving into database
});

app.post('/checkout/second', (req, res) => {
  console.log(req.body);
});

app.post('/checkout/third', (req, res) => {
  console.log(req.body);
});

/****
 *
 *
 * Other routes here....
 *
 *
 */

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);


/*

app.get('/checkout/first/:sessionId-:user-:email', (req, res) => {

});

app.get('/checkout/second/:sessionId.:addressOne.:addressTwo.:city.:state.:zip', (req, res) => {

});


app.get('/checkout/third/:sessionId.:credit.:expire.:cvv.:billZip', (req, res) => {

});

*/