const mongoose = require('mongoose');


// const studentAddressSchema = new Schema ({
//   country: {type:String},
//   street_name: {type:String},
//   house_number: {type:Number},
//   apartment_number: Schema.Types.Mixed,
//   zipcode: {type:Number}

// })

// const project_date

const studentSchema = mongoose.Schema( {
  first_name: {type:String, required: true},
  last_name: {type:String, required: true},  
  // email: {type:String, required: true},
  // parent_name: {type:String, required: false},
  // address: {type: studentAddressSchema, required:true},
  // parents_name: {type:String, required:false},
  // student_curriculum: [{
  //   project_date:{type:Object, default:Date.now, required:true},
  //   project_name: {type:String, required:true},
  //   project_notes: {type:String, required:false},
  //   teacher_project_comments: {type:String, required:false}        
  // }],
  // student_lesson_time: {type: Date, required: true},
  // teacher_comments: {type:String, required: false}, // private to students (only teachers can see)
})


studentSchema.methods.apiView = function () {

  return {

    first_name: this.first_name,
    last_name: this.last_name
  }
}

const Curriculum = mongoose.model('student-teacher-db', studentSchema);

module.exports = {Curriculum};




// user schema user_type: [teacher,student] enum type 


