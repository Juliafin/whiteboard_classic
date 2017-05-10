const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');
const should = chai.should();
const {
  TEST_DATABASE_URL
} = require('./../config_variables');
const {
  Curriculum
} = require('../student_models/models');
const {
  app,
  runServer,
  closeServer
} = require('./../server');
const {
  generateFakeCurriculumData,
  dismantleDB,
  student
} = require('./../student_models/seedDB.js');
const {
  User
} = require('../user_models/users');

const {
  generateUser
} = require('../user_models/seedUsers');

let teacherToken, studentToken, currentTeacher;
const teacher = generateUser('teacher');


chai.use(chaiHttp);
mongoose.Promise = global.Promise;

function loginUser() {
  return chai.request(app)
    .post('/auth/register')
    .send(teacher)
    .then(function (user) {
      currentTeacher = user.body;
      console.log('THIS IS THE STUDENT', student);
      console.log('THIS IS THE INITIAL USER REGISTRATION');
      // console.log('This is the user.body', user.body);
      generateFakeCurriculumData(20, false, user.body);


      return chai.request(app)
        .post('/auth/login')
        .send({
          username: teacher.username,
          password: teacher.password
        })
        .then(function (res) {
          // console.log('THESE ARE THE LOGS FROM THE SEED FUNCTION');
          // console.log(res.body);
          console.log('THIS IS THE TOKEN', res.body.token);
          teacherToken = res.body.token;
        }).catch(function (err) {
          console.error(err);
        });
    });
}



describe('Student Curriculum Endpoints', function () {

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return loginUser();
    // return generateFakeCurriculumData(20);
  });

  afterEach(function () {
    return dismantleDB();
  });

  after(function () {
    return closeServer();
  });
 
  describe('GET endpoint', function () {

    it('should return all existing blogs for teachers', function () {
      console.log('THIS IS THE TOKEN IN TEST',teacherToken);

      let curric;
      return chai.request(app)
        .get('/cu-manager')
        .set('Authorization', `bearer ${teacherToken}`)
        .then(function (_curric) {
          // console.log(_curric.body);
          curric = _curric;
          curric.should.have.status(200);
          curric.body.student_records.should.have.length.of.at.least(1);

          return Curriculum.count();
        })
        .then(function (count) {
          curric.body.student_records.should.have.length.of(count);
        })
        .catch((err) => {
          console.error(err);
        });

    });


    it('should do nothing', function() {

      console.log(teacherToken);
    })

  });

  
}); // end testing for all student records returned


it('should return all existing blogs for students', function () {
  console.log('THIS IS THE CURRENT TEACHER LOGGED IN:  ', currentTeacher);
  let curric;
  return chai.request(app)
    .post('/auth/register')
    .send(student)
    .then(function () {
      return chai.request(app)
        .post('/auth/login')
        .send({
          username: student.username,
          password: student.password
        })
        .then(function (res) {
          console.log(res.body.token);
          studentToken = res.body.token;

          return chai.request(app)
            .get('/cu-manager')
            .set('Authorization', `bearer ${studentToken}`)
            .then(function (_curric) {
              // console.log(_curric.body);
              curric = _curric;
              curric.should.have.status(200);
              curric.body.student_records.should.have.length.of.at.least(1);

              return Curriculum.count();
            })
            .then(function (count) {
              curric.body.student_records.should.have.length.of(count);
              
            })
            .catch((err) => {
              console.error(err);
            });

        });
    });
}); // end testing for all student records returned

// it('Should return student records with the correct fields', function () {

//   let curric, student_record;
//   console.log(teacherToken);

//   return chai.request(app)
//       .get('/cu-manager')
//       .set('Authorization', `bearer ${teacherToken}`)
//       .then(function (res) {
//         res.should.have.status(200);
//         res.should.be.json;
//           // console.log(res.body);
//         res.body.student_records.should.have.length.of.at.least(1);

//         res.body.student_records.forEach(function (record) {
//           record.should.be.a('object');
//           record.should.include.keys('id', 'address', 'first_name', 'last_name', 'email', 'student_lesson_time', 'student_curriculum');
//           record.address.should.be.a('object');
//           record.address.should.include.keys('street_address', 'city', 'state', 'zipcode');
//           record.student_curriculum.should.be.a('array');
//           record.student_curriculum[0].should.include.keys('project_name', 'project_description', 'teacher_project_comments', 'project_date');
//         });

//         student_record = res.body.student_records[0];
//         return Curriculum.findById(student_record.id);
//       })
//         .then(function (_student_record) {
//           _student_record.id.should.equal(student_record.id);
//           _student_record.address.street_address.should.equal(student_record.address.street_address);
//           _student_record.address.city.should.equal(student_record.address.city);
//           _student_record.address.state.should.equal(student_record.address.state);
//           _student_record.address.zipcode.should.equal(student_record.address.zipcode);
//           _student_record.first_name.should.equal(student_record.first_name);
//           _student_record.last_name.should.equal(student_record.last_name);
//           _student_record.email.should.equal(student_record.email);
//           student_record.student_lesson_time.should.be.a('object');
//           _student_record.student_lesson_time.weekday.should.equal(student_record.student_lesson_time.weekday);
//           // console.log(_student_record.student_lesson_time.startTime);
//           // console.log(student_record.student_lesson_time.startTime);
//           JSON.stringify(_student_record.student_lesson_time.startTime).should.equal(JSON.stringify(new Date(student_record.student_lesson_time.startTime)));
//           JSON.stringify(_student_record.student_lesson_time.endTime).should.equal(JSON.stringify(new Date(student_record.student_lesson_time.endTime)));
//           JSON.stringify(_student_record.student_lesson_time.startDate).should.equal(JSON.stringify(new Date(student_record.student_lesson_time.startDate)));
//           // console.log("DOG", (_student_record.student_lesson_time));
//           _student_record.student_curriculum.should.be.a('array');
//           _student_record.student_curriculum[0].project_name.should.equal(student_record.student_curriculum[0].project_name);
//           _student_record.student_curriculum[0].project_description.should.equal(student_record.student_curriculum[0].project_description);
//           _student_record.student_curriculum[0].teacher_project_comments.should.equal(student_record.student_curriculum[0].teacher_project_comments);
//           JSON.stringify(_student_record.student_curriculum[0].project_date).should.equal(JSON.stringify(new Date(student_record.student_curriculum[0].project_date)));
//         });




      // describe('POST endpoint', function () {
      //   it('Should add a new student record', function () {

      //     const fakeStudentRecord = generateFakeCurriculumData(1);
      //     // console.log(fakeStudentRecord);

      //     let token;
      //     return chai.request(app)
      //       .post('/auth/register')
      //       .send(teacher)
      //       .then(function () {
      //         return chai.request(app)
      //           .post('/auth/login')
      //           .send({
      //             username: teacher.username,
      //             password: teacher.password
      //           })
      //           .then(function (res) {
      //             console.log(res.body.token);
      //             token = res.body.token;

      //             return chai.request(app)
      //               .post('/cu-manager')
      //               .set('Authorization', `bearer ${token}`)
      //               .send(fakeStudentRecord)
      //               .then(function (res) {
      //                 console.log('res.body in POST test', res.body);

      //                 res.should.have.status(201);
      //                 res.should.be.json;
      //                 res.body.should.be.a('object');
      //                 res.body.should.include.keys('id', 'address', 'first_name', 'last_name', 'email', 'student_lesson_time', 'student_curriculum', 'author');
      //                 res.body.address.should.be.a('object');
      //                 res.body.address.should.include.keys('street_address', 'city', 'state', 'zipcode');
      //                 res.body.student_curriculum.should.be.a('array');
      //                 res.body.student_curriculum[0].should.include.keys('project_name', 'project_description', 'teacher_project_comments', 'project_date');
      //                 res.body.author.should.be.a('object');
      //                 res.body.author.should.include.keys('first_name', 'last_name', 'id');


                    // })
                    // .catch((err) => {
                    //   console.log(err);
                    // });

      //           });
      //       });
      //   });
      // });

      // describe('PUT endpoint', function () {

      //   it('Should update student fields on a PUT request', function () {

      //     const updatedStudentRecord = generateFakeCurriculumData(1);
      //     // console.log(updatedStudentRecord);
      //     let token;
      //     return chai.request(app)
      //       .post('/auth/register')
      //       .send(teacher)
      //       .then(function () {
      //         return chai.request(app)
      //           .post('/auth/login')
      //           .send({
      //             username: teacher.username,
      //             password: teacher.password
      //           })
      //           .then(function (res) {
      //             console.log(res.body.token);
      //             token = res.body.token;


      //             return Curriculum
      //               .findOne()
      //               .then(function (record) {
      //                 updatedStudentRecord.id = record.id;

      //                 return chai.request(app)
      //                   .put(`/cu-manager/${updatedStudentRecord.id}`)
      //                   .set('Authorization', `bearer ${token}`)
      //                   .send(updatedStudentRecord);
      //               })
      //               .then(function (res) {
      //                 res.should.have.status(201);

      //                 return Curriculum.findById(updatedStudentRecord.id);
      //               })
      //               .then(function (updated_record) {

      //                 updated_record.address.street_address.should.equal(updatedStudentRecord.address.street_address);
      //                 updated_record.address.state.should.equal(updatedStudentRecord.address.state);
      //                 updated_record.address.zipcode.should.equal(updatedStudentRecord.address.zipcode);
      //                 updated_record.address.city.should.equal(updatedStudentRecord.address.city);
      //                 updated_record.first_name.should.equal(updatedStudentRecord.first_name);
      //                 updated_record.last_name.should.equal(updatedStudentRecord.last_name);
      //                 updated_record.email.should.equal(updatedStudentRecord.email);
      //                 updated_record.student_lesson_time.weekday.should.equal(updatedStudentRecord.student_lesson_time.weekday);
      //                 JSON.stringify(updated_record.student_lesson_time.startTime).should.equal(JSON.stringify(new Date(updatedStudentRecord.student_lesson_time.startTime)));
      //                 JSON.stringify(updated_record.student_lesson_time.endTime).should.equal(JSON.stringify(new Date(updatedStudentRecord.student_lesson_time.endTime)));
      //                 JSON.stringify(updated_record.student_lesson_time.startDate).should.equal(JSON.stringify(new Date(updatedStudentRecord.student_lesson_time.startDate)));
      //                 // updated_record.student_curriculum[0].project_name.should.equal(updatedStudentRecord.student_curriculum[0].project_name);
      //               });
      //           });
      //       });


      //   });
      // });

      //   describe('DELETE endpoint', function () {

      //     it('Should delete a student record by ID', function () {

      //       let deletedStudentRecord;

      //       return Curriculum
      //         .findOne()
      //         .then(function (record) {
      //           deletedStudentRecord = record;
      //           return chai.request(app)
      //             .delete(`/cu-manager/${record.id}`);
      //         })
      //         .then(function (res) {
      //           res.should.have.status(200);

      //           return Curriculum.findById(deletedStudentRecord.id);
      //         })
      //         .then(function (deletedRecord) {
      //           should.not.exist(deletedRecord);
      //         })
      //         .catch((err) => {
      //           console.error(err);
      //         });
      //     });
      //   });

      //   it('Should delete student curriculum project ', function () {

      //     const deletedProject = {

      //       student_curriculum: {
      //         project_name: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
      //         project_description: faker.lorem.paragraph(),
      //         teacher_project_comments: faker.lorem.paragraph(),
      //         project_date: faker.date.recent().toISOString()
      //       }
      //     };

      //     Curriculum
      //       .findOne()
      //       .then(function (student_record) {
      //         return chai.request(app)
      //           .delete(`/cu-manager/student-curriculum-projects/${student_record.id}`)
      //           .send(deletedProject);
      //       })
      //       .then(function (res) {
      //         // console.log(res);
      //         res.should.have.status(201);
      //       }).catch(function (err) {
      //         console.error(err);
      //       });


      // });

// });

describe('Authentication endpoints', function () {

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  after(function () {
    dismantleDB();
    return closeServer();
  });

  const fakeUser = generateUser();
  describe('Registration endpoint', function () {

    it('Should register a new user', function () {
            // console.log(fakeUser);
      return chai.request(app)
              .post('/auth/register')
              .send(fakeUser)
              .then(function (res) {
                // console.log(res)
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.keys('username', 'role', 'first_name', 'last_name', 'id');
                res.body.username.should.equal(fakeUser.username);
                res.body.role.should.equal(fakeUser.role);
                res.body.first_name.should.equal(fakeUser.first_name);
                res.body.last_name.should.equal(fakeUser.last_name);
              })
              .then(function () {
                User
                  .findOne({
                    'username': fakeUser.username
                  })
                  .then(function (user) {
                    // console.log(user);
                    user.username.should.equal(fakeUser.username);
                    user.first_name.should.equal(fakeUser.first_name);
                    user.last_name.should.equal(fakeUser.last_name);
                    user.role.should.equal(fakeUser.role);
                  })
                  .catch(function (err) {
                    console.error(err);
                  });
              });
    });

    it('should show that a user is taken when sent a user that exists', function () {
      return chai.request(app)
              .post('/auth/register')
              .send(fakeUser)
              .then(function () {
                let somethingTrue = true;
                somethingTrue.should.equal(false);
              })
              .catch(function (err) {
                // console.log(err.response.body);
                err.should.have.status(422);
                err.response.body.should.contain.key('message');
                err.response.body.message.should.be.a('string');
                err.response.body.message.should.equal('username already taken');
              });
    });
  });

  describe('login endpoint', function () {

    it('Should allow an existing user to log in', function () {

      return chai.request(app)
              .post('/auth/login')
              .send({
                username: fakeUser.username,
                password: fakeUser.password
              })
              .then(function (res) {
                res.should.have.status(200);
                res.body.should.have.key('token');
              });
    });

    it('should throw an unauthorized error if provided with the wrong password', function () {
      return chai.request(app)
              .post('/auth/login')
              .send({
                username: fakeUser.username,
                password: 'somerandomstring'
              })
              .catch(function (err) {
                // console.log(err);
                (err.response.body);
                err.should.have.status(401);
                err.response.body.should.contain.key('error');
                err.response.body.error.should.be.a('string');
                err.response.body.error.should.equal('unauthorized');
              });
    });
  });
});