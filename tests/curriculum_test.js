const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');
const should = chai.should();
const {TEST_DATABASE_URL} = require('./../config_variables');
const {Curriculum} = require('../student_models/models');

chai.use(chaiHttp);
mongoose.Promise = global.Promise;

// function generateFakeCurriculumData (numberOfStudentRecords) {
//   const seedData = [];

//   for (let i=0; i < numberOfStudentRecords.length; i++) {
    

//   }
// }