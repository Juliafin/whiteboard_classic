`use strict`;

const express = require('express');
const morgan = require('morgan');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config_variables');

const app = express();
const {Curriculum} = require('./student_models/models');
const {User} = require('./user_models/users'); 

const curriculum_router = require('./curriculum_router/curriculum_router');
const auth_router = require('./auth_router');
const {generateFakeCurriculumData} = require('./student_models/seedDB');
const {generateUser, saveUser} = require('./user_models/seedUsers');

app.use(morgan('combined'));

app.use('/cu-manager', curriculum_router);
app.use('/auth', auth_router);
express.static('public')
app.get('/', (req, res) => {


})
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
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    })
    mongoose.connection.once('open', () => {

      User.count()
        .then(function(count) {
          if (count === 0){
            saveUser(generateUser());
          }
        })
      Curriculum.count()
        .then(function(count) {
          if (count === 0) {
            generateFakeCurriculumData(19);      
          }
        });
      console.log('mongoose connected');} )
  })
  
}

function closeServer() {

  return mongoose.disconnect().then( () => { 
    console.log('mongoose disconnecting');
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
