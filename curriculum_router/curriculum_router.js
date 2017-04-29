const express = require('express');
const curriculum_router = express.Router();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {
  Curriculum
} = require('../student_models/models');
curriculum_router.use(bodyParser.json());


curriculum_router.get('/', (req, res) => {
  const filtersToSearch = {};
  const queryableFields = ['first_name', 'last_name', 'email', 'parent_first_name', 'parent_last_name', 'student_lesson_time'];
  queryableFields.forEach(field => {
    //  ?first_name=
    if (req.query[field]) {
      filtersToSearch[field] = req.query[field];
    }
  });
  Curriculum
    .find(filtersToSearch)
    .then(student_records => {
      return res.json({
        student_records: student_records.map((record) => {
          return record.apiView();
        })
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: 'Something went wrong with the server'
      });
    });
});


curriculum_router.get('/:id', (req, res) => {
  Curriculum
    .findById(req.params.id)
    .then(blog => res.json(blog.apiView()))
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Internal server error: No ID match found"
      });
    });
});



curriculum_router.post('/', (req, res) => {
  console.log('This is the req.body', req.body);

  const requiredFields = ['first_name', 'last_name', 'email', 'address', 'student_lesson_time', 'student_curriculum'];
  const addressFields = ['street_address', 'state', 'zipcode', 'country'];
  const studentCurriculumFields = ['project_name', 'project_description'];
  const studentLessonTime = ['weekday', 'startTime', 'endTime'];
  let missing = {};
  let address = {};
  let student_lesson_time = {};
  let student_curriculum = {};

  // check if first tier of required fields is missing
  requiredFields.forEach(function (field) {
    if (!(field in req.body)) {
      missing[field] = field;
    }
  });

  // check if required address fields are missing
  addressFields.forEach(function (addressCategory) {
    if (!(addressCategory in req.body.address)) {
      address.addressCategory = addressCategory;
    }
  });

  if (Object.keys(address).length !== 0) {
    missing.address = address;
  }

  // check if student curriculum fields are missing
  studentCurriculumFields.forEach(function (curricField) {
    // console.log(req.body);
    // console.log(curricField)
    if (!(curricField in req.body['student_curriculum'][0])) {
      student_curriculum[curricField] = curricField;
    }
  });

  if (Object.keys(student_curriculum).length !== 0) {
    missing.student_curriculum = student_curriculum;
  }

  //  check if student lesson times are missing
  studentLessonTime.forEach(function (lessonField) {
    if (!(lessonField in req.body['student_lesson_time'])) {
      student_lesson_time[lessonField] = lessonField;
    }
  });

  if (Object.keys(student_lesson_time).length !== 0) {
    missing.student_lesson_time = student_lesson_time;
  }


  if (Object.keys(missing).length !== 0) {
    const missingObj = {
      missing_fields: missing
    };
    return res.status(400).json(missingObj);
  }

  Curriculum
    .create(req.body)
    .then(
      (student_record) => {
        return res.status(201).json(student_record.apiView());
      }
    )
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "Internal Server Error"
      });
    });
});


curriculum_router.put(':id', (req, res) => {

  if (!(req.params.id === req.body.id)) {
    const mismatchedId = `
      The request path id ${req.params.id} and the reqest body id ${req.body.id} do not match.`;
    console.error(mismatchedId);
    return res.status(400).json({
      message: mismatchedId
    });
  }

  // Accept an object with fields needed to be changed
  // if the fields are in student_curriculum, object must include document ID, index like:
  /*  {
        id:_
        student_curriculum:
          all object properties
        index: number
      }
  */


  if ('address' in req.body || 'student_lesson_time' in req.body) {
    Curriculum
      .findByIdAndUpdate(req.params.id, {
        $set: req.body['address'] || req.body['student_lesson_time']
      })
      .then((student_record) => {
        return res.status(201).json({
          updated: student_record.apiView()
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          error: 'Internal server error, could not update the record.'
        });

      });
  }


  if ('student_curriculum' in req.body) {
    Curriculum
      .findByIdAndUpdate(req.params.id), {
        set: req.body
      };

  }




});






module.exports = curriculum_router;