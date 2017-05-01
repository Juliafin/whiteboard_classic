const mongoose = require('mongoose');

const zipcodeValid = [/^\d{5}(?:[-\s]\d{4})?$/, 'The zipcode must either be in the format XXXXX or XXXXX-XXXX'];
const maxlength = [20, 'The length is longer than 20 characters'];
// const nameValid

const studentAddressSchema = new mongoose.Schema ({
  street_address: {
    type:String, 
    required:true, 
    trim:true},
  apartment_number: mongoose.Schema.Types.Mixed,
  city: {
    type:String,
    required:true,
    trim:true
  },
  state: {
    type:String, 
    required:true, 
    minlength:2, 
    maxlength:2},
  zipcode: {
    type:String, 
    required:true, 
    match: zipcodeValid},
});

const studentLessonTimeSchema = new mongoose.Schema ({
  startDate: {
    type: Date, 
    required:true, 
    default: Date()},
  weekday: {
    type: String, 
    required:true,
    trim:true
  },
  startTime: {
    type: Date, 
    required: true
  },
  endTime: {type: Date, 
    required: true}
});
// object that has weekday and time 
// student_start_date when student 

// const project_date
// TDOD

const studentSchema = mongoose.Schema( {
  first_name: {
    type:String, 
    required: true, 
    maxlength: maxlength, 
    trim:true
  },
  last_name: {
    type:String, 
    required: true, 
    maxlength: maxlength, 
    trim:true
  },  
  email: {
    type:String, 
    required: true, 
    trim:true
  },
  parent_first_name: {
    type:String, 
    maxlength: maxlength, 
    trim:true
  },
  parent_last_name: {
    type:String, 
    maxlength: maxlength, 
    trim:true
  },
  address: {
    type: studentAddressSchema, 
    required:true},
  student_curriculum: [{
    project_date:{
      type:Date, 
      default:Date.now(), 
      required:true
    },
    project_name: {
      type:String, 
      required:true, 
      trim:true
    },
    project_description: {
      type:String, 
      required:true,
      trim:true
    },
    // array of comments TODO
    teacher_project_comments: {
      type:String,
      trim:true
    }        
  }],
  student_lesson_time: {
    type: studentLessonTimeSchema, 
    required: true},
  teacher_comments: {
    type:String
  }, // private to students (only teachers can see)
});

studentSchema.methods.apiView = function () {
  // if statements to check user role

  return {
    id: this._id,
    address: this.address,
    parent_first_name: this.parent_first_name,
    parent_last_name: this.parent_last_name,
    first_name: this.first_name,
    last_name: this.last_name,
    email: this.email,
    student_lesson_time: this.student_lesson_time,
    student_curriculum: this.student_curriculum

  };
};

const Curriculum = mongoose.model('student-teacher-db', studentSchema);

module.exports = {Curriculum};




// user schema user_type: [teacher,student] enum type 


