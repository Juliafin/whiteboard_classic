const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');
const should = chai.should();
const {TEST_DATABASE_URL} = require('./../config_variables');
const {Curriculum} = require('../student_models/models');
const{app, runServer, closeServer} = require('./../server');
const {generateFakeCurriculumData, dismantleDB} = require('./../student_models/seedDB.js');


chai.use(chaiHttp);
mongoose.Promise = global.Promise;




describe('Student Curriculum Endpoints', function () {


  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return generateFakeCurriculumData(20);
  });

  afterEach(function () {
    return dismantleDB();
  });

  after(function () {
    return closeServer();
  });



  describe('GET endpoint', function() {

    it('should return all existing blogs', function () {

      let curric;

      return chai.request(app)
        .get('/cu-manager')
        .then(function(curric) {

          curric = _curric

          curric.should.have.status(200);
          curric.body.student_records.should.have.length.of.at.least(1);

          return Curriculum.count();

        })
        .then(function(count) {
          curric.body.student_records.should.have.length.of(count);
        })
        .catch( (err) => {console.error(err);});

    });


  });

})


