const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

let responseDefinition = 'CREATE TABLE IF NOT EXISTS responses \
                         (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
                          session_id VARCHAR(50) NOT NULL, \
                          lastVisit VARCHAR (10))';

//Consider throwing in password here, but that's for the authentication step I think
//Also consider changing session_id to just the id of the session_id in the response table
let firstDefinition = 'CREATE TABLE IF NOT EXISTS firstform \
                       (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
                        session_id INT NOT NULL,\
                        username VARCHAR(30) NOT NULL,\
                        password VARCHAR(30) NOT NULL,\
                        email VARCHAR(50) NOT NULL)';

let secondDefinition = 'CREATE TABLE IF NOT EXISTS secondform \
                       (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
                       session_id INT NOT NULL,\
                       addressOne VARCHAR(50) NOT NULL,\
                       addressTwo VARCHAR(50),\
                       city VARCHAR (30) NOT NULL,\
                       state VARCHAR(15) NOT NULL,\
                       zip VARCHAR(12) NOT NULL)';

let thirdDefinition = 'CREATE TABLE IF NOT EXISTS thirdform \
                       (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
                        session_id INT NOT NULL,\
                        credit VARCHAR(30) NOT NULL,\
                        expiry VARCHAR(8) NOT NULL,\
                        cvv VARCHAR(5) NOT NULL,\
                        billZip VARCHAR(12) NOT NULL)';

let fourthDefinition = 'CREATE TABLE IF NOT EXISTS submitform \
                       (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
                       session_id INT NOT NULL,\
                       date VARCHAR(30) NOT NULL, \
                       username VARCHAR(30) NOT NULL,\
                       password VARCHAR(30) NOT NULL,\
                       email VARCHAR(50) NOT NULL, \
                       addressOne VARCHAR(50) NOT NULL,\
                       addressTwo VARCHAR(50),\
                       city VARCHAR (30) NOT NULL,\
                       state VARCHAR(15) NOT NULL,\
                       zip VARCHAR(12) NOT NULL, \
                       credit VARCHAR(30) NOT NULL,\
                       expiry VARCHAR(8) NOT NULL,\
                       cvv VARCHAR(5) NOT NULL,\
                       billZip VARCHAR(12) NOT NULL)';

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(responseDefinition)
  )
  .then(() =>
    db.queryAsync(firstDefinition)
  )
  .then(() =>
    db.queryAsync(secondDefinition)
  )
  .then(() =>
    db.queryAsync(thirdDefinition)
  )
  .then(() =>
    db.queryAsync(fourthDefinition)
  )
  .catch((err) => console.log(err));

module.exports = db;