const mongoose = require('mongoose');
const faker = require('faker')
const {User} = require('./users');

function generateUser() {
  console.log('Seeding one user to the db');
  User
  .create({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    role: randomRole(),
    password: faker.internet.password(),
    username: faker.internet.userName()
  })
}


function randomRole() {

  roles = ['student', 'teacher'];

  return roles[Math.floor(Math.random() * roles.length )]
}

module.exports = generateUser
