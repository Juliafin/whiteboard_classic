const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');
const should = chai.should();
const {DATABASE_URL} = require('./../config_variables');
const {Curriculum} = require('../student_models/models');
const{app, runServer, closeServer} = require('./../server');

chai.use(chaiHttp);
mongoose.Promise = global.Promise;


// function fake

function generateFakeCurriculumData (numberOfStudentRecords) {
  console.log('starting generating fake data');
  console.log(numberOfStudentRecords);

  for (let i=0; i < numberOfStudentRecords; i++) {
    console.log('creating curriculum object');
    Curriculum
    .create({
      first_name:faker.name.firstName(),
      last_name:faker.name.lastName(),
      email:faker.internet.email(),
      parent_first_name:faker.name.firstName(),
      parent_last_name:faker.name.lastName(),
      address: {
        street_address:faker.address.streetAddress(),
        state:faker.address.stateAbbr(),
        zipcode:faker.address.zipCode()
      },
      student_curriculum: [{
        project_name: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
        project_description:faker.lorem.paragraph(),
        teacher_project_comments:faker.lorem.paragraph()
      }],
      student_lesson_time:{
        weekday: faker.date.weekday(),
        startTime: faker.date.recent(),
        endTime: faker.date.recent()
      },
      teacher_comments:faker.lorem.paragraphs()
    })
    .catch(err => console.log(err));
   }

  } // ends for loop



module.exports = {generateFakeCurriculumData};

function seedCurriculumDb(curricArr) {
    // returns a promise
  return Curriculum.insertMany(curricArr);
}

function dismantleDB() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}


// describe('Student Curriculum Endpoints', function () {


//   before(function () {
//     return runServer(TEST_DATABASE_URL);
//   });

//   beforeEach(function () {
//     return seedCurriculumDb(generateFakeCurriculumData(19));
//   });

//   afterEach(function () {
//     // return dismantleDB();
//   });

//   after(function () {
//     return closeServer();
//   });



// })