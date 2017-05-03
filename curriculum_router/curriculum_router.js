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
  // console.log('This is the req.body', req.body);

  const requiredFields = ['first_name', 'last_name', 'email', 'address', 'student_lesson_time', 'student_curriculum'];
  const addressFields = ['street_address', 'state', 'city','zipcode'];
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


curriculum_router.put('/:id', (req, res) => {

  let student_record;

  Curriculum
    .findByIdAndUpdate(req.params.id)
    .then((student_record) => {

      // Check whether there are updates for nested properties. 
      // Then delete them, and update tier 1 properties according to the req.body
      if ('address' in req.body) {
        student_record.address = req.body.address;
        delete req.body.address;
      }

      if ('student_lesson_time' in req.body) {
        student_record.student_lesson_time = req.body.student_lesson_time;
        delete req.body.student_lesson_time;
      }

      if ('student_curriculum' in req.body) {
        student_record.student_curriculum[req.body.index] = req.body.student_curriculum;
        delete req.body.student_curriculum;
        delete req.body.index;
      }

      let topLevelKeys = Object.keys(req.body);
      // console.log(topLevelKeys)
      topLevelKeys.forEach((key) => {
      // console.log(req.body[key]);
      // console.log(key);
      // console.log(student_record[key])
        student_record[key] = req.body[key];
      });

      student_record
        .save()
        .then((_student_record) => {
          _student_record = student_record;
          return res.status(201).json({updated: student_record});

        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({message: "Internal server error, document could not be updated."});
        });
    });
});

curriculum_router.put('/student-curriculum-projects/:id', (req, res) => {

  if ('student_curriculum' in req.body) {
    const index = req.body.index;
    const student_curriculum_index = "student_curriculum." + index;

    Curriculum
      .findByIdAndUpdate(req.params.id, {
        $push: {
          [student_curriculum_index]: req.body.student_curriculum
        }
      }, {
        new: true,
        runValidators: true
      })
      .then((student_record) => {
        return res.status(201).json({
          updated: student_record
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          error: 'Internal server error, could not update the record.'
        });

      });
  }
});

// delete a student
curriculum_router.delete('/:id', (req, res) => {
  Curriculum
    .findByIdAndRemove(req.params.id)
    .then((blog) => {
      return res.status(200).json({
        item_deleted: blog
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Internal server error, item not found."
      });
    });
});


// delete a specific student project
// expects full curriculum object to be provided

curriculum_router.delete('/student-curriculum-projects/:id', (req, res) => {
  
  if ('student_curriculum' in req.body) {

    Curriculum
      .findByIdAndUpdate(req.params.id, {
        $pull: {
          "student_curriculum": req.body.student_curriculum
        }
      }, {
        new: true        
      })
      .then((student_record) => {
        return res.status(201).json({
          delete: student_record
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          error: 'Internal server error, could not delete the record.'
        });

      });
  }
});












module.exports = curriculum_router;