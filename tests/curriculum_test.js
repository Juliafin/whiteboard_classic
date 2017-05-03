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

          curric = _curric;

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
            record.address.should.include.keys('street_address', 'city', 'state', 'zipcode');
            record.student_curriculum.should.be.a('array');
            record.student_curriculum[0].should.include.keys('project_name', 'project_description', 'teacher_project_comments', 'project_date');
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
          // console.log(_student_record.student_lesson_time.startTime);
          // console.log(student_record.student_lesson_time.startTime);
          JSON.stringify(_student_record.student_lesson_time.startTime).should.equal(JSON.stringify(new Date(student_record.student_lesson_time.startTime)));
          JSON.stringify(_student_record.student_lesson_time.endTime).should.equal(JSON.stringify(new Date(student_record.student_lesson_time.endTime)));
          JSON.stringify(_student_record.student_lesson_time.startDate).should.equal(JSON.stringify(new Date(student_record.student_lesson_time.startDate)));
          console.log("DOG", (_student_record.student_lesson_time));          
          _student_record.student_curriculum.should.be.a('array');
          _student_record.student_curriculum[0].project_name.should.equal(student_record.student_curriculum[0].project_name);
          _student_record.student_curriculum[0].project_description.should.equal(student_record.student_curriculum[0].project_description);
          _student_record.student_curriculum[0].teacher_project_comments.should.equal(student_record.student_curriculum[0].teacher_project_comments);
          JSON.stringify(_student_record.student_curriculum[0].project_date).should.equal(JSON.stringify(new Date (student_record.student_curriculum[0].project_date)));
        });
    }); // end student records test

});

  describe('POST endpoint', function() {
    it('Should add a new student record', function() {

      const fakeStudentRecord = generateFakeCurriculumData(1);
      console.log(fakeStudentRecord);

      return chai.request(app)
        .post('/cu-manager')
        .send(fakeStudentRecord)
        .then(function (res) {

          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.should.include.keys('id', 'address', 'first_name', 'last_name', 'email', 'student_lesson_time', 'student_curriculum');
          res.address.should.be.a('object');
          res.address.should.include.keys('street_address', 'city', 'state', 'zipcode');
          res.student_curriculum.should.be.a('array');
          res.student_curriculum[0].should.include.keys('project_name', 'project_description', 'teacher_project_comments', 'project_date');

        })
        .catch( (err) => {console.log(err);});

    });
  });

  describe('PUT endpoint', function () {

    it('Should update student fields on a PUT request', function() {

      const updatedStudentRecord = generateFakeCurriculumData(1);
      console.log(updatedStudentRecord);

      return Curriculum
        .findOne()
        .then(function (record) {
          updatedStudentRecord.id = record.id;

          return chai.request(app)
            .put(`/cu-manager/${updatedStudentRecord.id}`)
            .send(updatedStudentRecord);
        })
        .then(function(res) {
          res.should.have.status(201);
          
          return Curriculum.findById(updatedStudentRecord.id);
        })
        .then(function(updated_record) {

          updated_record.address.street_address.should.equal(updatedStudentRecord.address.street_address);
          updated_record.address.state.should.equal(updatedStudentRecord.address.state);
          updated_record.address.zipcode.should.equal(updatedStudentRecord.address.zipcode);
          updated_record.address.city.should.equal(updatedStudentRecord.address.city);
          updated_record.first_name.should.equal(updatedStudentRecord.first_name);
          updated_record.last_name.should.equal(updatedStudentRecord.last_name);
          updated_record.email.should.equal(updatedStudentRecord.email);
          updated_record.student_lesson_time.weekday.should.equal(updatedStudentRecord.student_lesson_time.weekday);
          JSON.stringify(updated_record.student_lesson_time.startTime).should.equal(JSON.stringify(new Date(updatedStudentRecord.student_lesson_time.startTime)));
          JSON.stringify(updated_record.student_lesson_time.endTime).should.equal(JSON.stringify(new Date(updatedStudentRecord.student_lesson_time.endTime)));
          JSON.stringify(updated_record.student_lesson_time.startDate).should.equal(JSON.stringify(new Date(updatedStudentRecord.student_lesson_time.startDate)));
          // updated_record.student_curriculum[0].project_name.should.equal(updatedStudentRecord.student_curriculum[0].project_name);
        });
    });
  });

  describe('DELETE endpoint', function() {

    it('Should delete a student record by ID', function() {

      let deletedStudentRecord;

      return Curriculum
        .findOne()
        .then(function(record) {
          deletedStudentRecord = record;
          return chai.request(app)
            .delete(`/cu-manager/${record.id}`);
        })
        .then(function(res) {
          res.should.have.status(200);

          return Curriculum.findById(deletedStudentRecord.id);
        })
        .then(function(deletedRecord){
          should.not.exist(deletedRecord);
        })
        .catch( (err) => {console.error(err);});
    });
  });

  describe('Should delete student curriculum project ', function() {

  const deletedProject = {

    student_curriculum: {
      project_name: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
      project_description: faker.lorem.paragraph(),
      teacher_project_comments: faker.lorem.paragraph(),
      project_date: faker.date.recent().toISOString()
    } 
  };

  Curriculum
    .findOne()
    .then(function(student_record) {
      return chai.request(app)
      .delete(`/cu-manager/student-curriculum-projects/${student_record.id}`)
      .send(deletedProject)
    })
    .then(function(res){
      console.log(res);
      res.should.have.status(201);
    })


  });

});



