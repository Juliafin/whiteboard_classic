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

    });// end testing for all student records returned

    it('Should return student records with the correct fields', function() {

      let student_record;
      return chai.request(app)
        .get('/cu-manager')
        .then(function(res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.student_records.should.have.length.of.at.least(1);
          
          res.body.student_records.forEach(function(record) {
            record.should.be.a('object');
            record.should.include.keys('id', 'address', 'first_name', 'last_name', 'email', 'student_lesson_time', 'student_curriculum');
            record.address.should.be.a('object');
            record.address.should.include.keys('street_address', 'city', 'state', 'zipcode', '_id');
            record.student_curriculum.should.be.a('array');
            record.student_curriculum[0].should.include.keys('project_name', 'project_description', 'teacher_project_comments', '_id', 'project_date');
          });

          student_record = res.body.student_records[0];
          return Curriculum.findById(student_record.id);
        })
        .then(function(_student_record) {
          _student_record.id.should.equal(student_record.id);
          _student_record.address.street_address.should.equal(student_record.address.street_address);
          _student_record.address.city.should.equal(student_record.address.city);
          _student_record.address.state.should.equal(student_record.address.state);
          _student_record.address.zipcode.should.equal(student_record.address.zipcode);
          _student_record.first_name.should.equal(student_record.first_name);
          _student_record.last_name.should.equal(student_record.last_name);
          _student_record.email.should.equal(student_record.email);
          student_record.student_lesson_time.should.be.a('object');
          _student_record.student_lesson_time.weekday.should.equal(student_record.student_lesson_time.weekday);
          // console.log(student_record.student_lesson_time.startTime);
          // console.log(JSON.stringify(_student_record.student_lesson_time.startTime));
          // _student_record.student_lesson_time.startTime.should.equal(student_record.student_lesson_time.startTime);
          // _student_record.student_lesson_time.endTime.should.equal(student_record.student_lesson_time.endTime);
          // console.log(typeof(student_record.student_lesson_time._id)); 
          console.log(typeof(JSON.stringify(_student_record.student_lesson_time._id)));
          console.log((JSON.stringify(_student_record.student_lesson_time._id)));
          
          // student_record.student_lesson_time._id.should.equal(JSON.stringify(_student_record.student_lesson_time._id));
          
        })
    })

});

})


