`use strict`;

const express = require('express');
const morgan = require('morgan');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config_variables');

const app = express();

const curriculum_router = require('./curriculum_router/curriculum_router');

app.use(morgan('combined'));


app.use('/cu-manager', curriculum_router);

app.use('*', (req, res) => {
  res.status(404).send('Nothing found at this endpoint. Please do not try again.');
});


// add server functions to export for tests
let server;

function runServer(databaseUrl= DATABASE_URL, port=PORT) {
  return new Promise( (resolve,reject) => {
    mongoose.connect(databaseUrl, (err) => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);

      }).on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  
  return mongoose.disconnect().then( () => { 
    return new Promise( (resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          reject(err);
          return;
        } 
        resolve();
      });
    }); 
  });
}

if(require.main === module) {
  runServer()
  .catch( err => {console.error(`There was an error: ${err}`);
  });
}

module.exports = {app, runServer, closeServer};


// #1 build server
// #2 create models


// TABLE

// Student NAME (first and last)     ///   Address // lesson time /// 



// #3 build api
    // get list of students
    // change info for a student
    // delete a student
    // 

// #4 connect to mongo
