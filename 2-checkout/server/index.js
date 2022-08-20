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

app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/checkout/:sessionId', (req, res) => {
  // // console.log(req.params.sessionId);
  let getParams = `SELECT session_id FROM responses WHERE session_id = ?`;
  let postParams = `INSERT INTO responses (session_id) VALUES (?)`;
  // // console.log(req);
  // // console.log(req);
  // // console.log(req.session_id);
  // // console.log(typeof req.session_id); //string
  db.query(getParams, req.params.sessionId, (err, response) => {
    // console.log(response);
    if (err) {
      console.error(err);
      res.send('error');
    } else {
      if (response.length === 1) {
        res.send('revisiting session');
      } else {
        db.query(postParams, req.params.sessionId, (err, response) => {
          if (err) {
            console.error(err);
            res.send('error');
          } else {
            // console.log(response);
            res.send('new session');
          }
        })
      }
    }
  })

  // db.queryAsync(getParams, req.params.sessionId)
  // .then((response) => {
  //   console.log(response);
  //   if (response.length === 1) {
  //     res.send('revisiting session');
  //   } else {
  //     db.queryAsync(postParams, req.params.sessionId)
  //     .then(()=>{
  //       res.send('new session');
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.send('error');
  //     })
  //   }
  // })
  // .catch((err) => {
  //   console.error(err);
  //   res.send('error');
  // })
});

app.post('/checkout/firstForm', (req, res) => {
  // console.log(req);
  // console.log(req.body);
  // //req.body.password would have to be assigned a hashed version before saving into database
  let searchQuery = 'SELECT * FROM firstform WHERE session_id = (SELECT id FROM responses WHERE session_id = ?)';
  let postQuery = 'INSERT INTO firstform (username, password, email, session_id) \
                   values (?, ?, ?, (SELECT id FROM responses WHERE session_id = ?))';
  let updateQuery = 'UPDATE firstform SET username = ?, password = ?, email = ? \
                     WHERE session_id = (SELECT id FROM responses WHERE session_id = ?)';
  let queryArgs = [req.body.username, req.body.password, req.body.email, req.body.session_id];
  db.query(searchQuery, req.body.session_id, (err, response) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else {
      if (response.length === 1) {
        db.query(updateQuery, queryArgs, (err, response) => {
          if (err) {
            console.error(err);
            res.send(err);
          } else {
            res.send('user info updated');
          }
        });
      } else {
        db.query(postQuery, queryArgs, (err, response) => {
          if (err) {
            console.error(err);
            res.send(err);
          } else {
            res.send('user info submitted');
          }
        });
      }
    }
  })
});

app.post('/checkout/secondForm', (req, res) => {
  // console.log(req.body);

  let searchQuery = 'SELECT * FROM secondform WHERE session_id = (SELECT id FROM responses WHERE session_id = ?)';
  let postQuery = 'INSERT INTO secondform (addressOne, addressTwo, city, state, zip, session_id) \
                   values (?, ?, ?, ?, ?, (SELECT id FROM responses WHERE session_id = ?))';
  let updateQuery = 'UPDATE secondform SET addressOne = ?, addressTwo = ?, city = ?, state = ?, zip = ? \
                     WHERE session_id = (SELECT id FROM responses WHERE session_id = ?)';
  let queryArgs = [req.body.addressOne, req.body.addressTwo, req.body.city, req.body.state, req.body.zip, req.body.session_id];
  db.query(searchQuery, req.body.session_id, (err, response) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else {
      if (response.length === 1) {
        db.query(updateQuery, queryArgs, (err, response) => {
          if (err) {
            console.error(err);
            res.send(err);
          } else {
            res.send('location info updated');
          }
        });
      } else {
        db.query(postQuery, queryArgs, (err, response) => {
          if (err) {
            console.error(err);
            res.send(err);
          } else {
            res.send('location info submitted');
          }
        });
      }
    }
  })
});

app.post('/checkout/thirdForm', (req, res) => {
  // console.log(req.body);

  let searchQuery = 'SELECT * FROM thirdform WHERE session_id = (SELECT id FROM responses WHERE session_id = ?)';
  let postQuery = 'INSERT INTO thirdform (credit, expiry, cvv, billZip, session_id) \
                   values (?, ?, ?, ?, (SELECT id FROM responses WHERE session_id = ?))';
  let updateQuery = 'UPDATE thirdform SET credit = ?, expiry = ?, cvv = ?, billZip = ? \
                     WHERE session_id = (SELECT id FROM responses WHERE session_id = ?)';
  let queryArgs = [req.body.credit, req.body.expiry, req.body.cvv, req.body.billZip, req.body.session_id];
  db.query(searchQuery, req.body.session_id, (err, response) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else {
      if (response.length === 1) {
        db.query(updateQuery, queryArgs, (err, response) => {
          if (err) {
            console.error(err);
            res.send(err);
          } else {
            res.send('credit info updated');
          }
        });
      } else {
        db.query(postQuery, queryArgs, (err, response) => {
          if (err) {
            console.error(err);
            res.send(err);
          } else {
            res.send('credit info submitted');
          }
        });
      }
    }
  })
});

app.get('/checkout/submit/:sessionId', (req, res) => {
  // console.log(req.params.sessionId);
  let firstQuery = 'SELECT session_id, username, password, email FROM firstform WHERE session_id = (SELECT id FROM responses WHERE session_id = ?)';
  let secondQuery = 'SELECT addressOne, addressTwo, city, state, zip FROM secondform WHERE session_id = (SELECT id FROM responses WHERE session_id = ?)';
  let thirdQuery = 'SELECT credit, expiry, cvv, billZip FROM thirdform WHERE session_id = (SELECT id FROM responses WHERE session_id = ?)';
  let finalParams = {};

  db.queryAsync(firstQuery, req.params.sessionId)
  .then((response) => {
    let data = response[0][0];
    for (let param in data) {
      finalParams[param] = data[param];
    }
    return db.queryAsync(secondQuery, req.params.sessionId);
  })
  .then((response) => {
    let data = response[0][0];
    for (let param in data) {
      finalParams[param] = data[param];
    }
    return db.queryAsync(thirdQuery, req.params.sessionId);
  })
  .then((response) => {
    let data = response[0][0];
    for (let param in data) {
      finalParams[param] = data[param];
    }
    res.send(finalParams);
  })
  .catch((err) => {console.error(err)})
});

//There must be a better way

app.post('/checkout/submit', (req, res) => {
  let data = req.body;
  let paramArgs = [data.session_id, data.date, data.username, data.password, data.email, data.addressOne, data.addressTwo, data.city, data.state, data.zip, data.credit, data.expiry, data.cvv, data.billZip];

  let query = 'INSERT INTO submitform \
               (session_id, date, username, password, email, addressOne, addressTwo, city, state, zip, credit, expiry, cvv, billZip) \
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.queryAsync(query, paramArgs)
  .then((response) => {
    res.send('checkout success');
  })
  .catch((err) => {
    console.error(err);
    res.send('error');
  })
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