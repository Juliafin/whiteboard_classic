const express = require('express');
const curriculum_router = express.Router();

const bodyParser = require('body-parser');
console.log(bodyParser.json().toString())
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {Curriculum} = require('../student_models/models');
curriculum_router.use(bodyParser.json());


curriculum_router.get('/', (req, res) => {

  const filtersToSearch = {};
  const queryableFields = ['first_name', 'last_name'];

  queryableFields.forEach(field => {
    if (req.query[field]) {
      filtersToSearch[field] = req.query[field];
    }
  });

  Curriculum

    .find(filtersToSearch)
    .then(student_records => {

      return res.json({ 
        student_records: student_records.map((record) => {
          record.apiView();
        })
      });
    })
    
    .catch((err) => {
      console.error(err);
      res.status(500).json({message: 'Something went wrong with the server'});
    });

});