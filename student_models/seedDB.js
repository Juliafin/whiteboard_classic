// function fake

const mongoose = require('mongoose');
const {Curriculum} = require('./../student_models/models');
const faker = require('faker');

function generateFakeCurriculumData (numberOfStudentRecords) {
  console.log('Generating fake student data');
  console.log(numberOfStudentRecords);

  for (let i=0; i < numberOfStudentRecords; i++) {
    // console.log('creating curriculum object');
    Curriculum
    .create({
      first_name:faker.name.firstName(),
      last_name:faker.name.lastName(),
      email:faker.internet.email(),
      parent_first_name:faker.name.firstName(),
      parent_last_name:faker.name.lastName(),
      address: {
        street_address:faker.address.streetAddress(),
        city:faker.address.city(),
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
   console.log('Student records generated.')
  } // ends for loop




function seedCurriculumDb(curricArr) {
    // returns a promise
  return Curriculum.insertMany(curricArr);
}

function dismantleDB() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}


module.exports = {generateFakeCurriculumData, dismantleDB};
