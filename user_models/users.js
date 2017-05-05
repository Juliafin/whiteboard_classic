const mongoose = require('mongoose');

const userValidation = [/^\w{4,}$/, 'Username must contain alphanumberic characters'];
const passValidation = [/^(?=.*\d)(?=.*[A-Za-z])[a-zA-Z\d@!\?\^\\\{\}()#$%_-]{8,20}$/, 'Password must be 8 to 20 characters, and contain one letter, one number, and one special character'];
const maxlength = [20, 'The length is longer than 20 characters.'];
const roleValidation = [/(?=^student$)|(?=^teacher$)/, 'Role must be a teacher or a student']
const userSchema = mongoose.Schema( {
  username: {
    type:String,
    required: true,
    minlength: 4,
    maxlength: maxlength,
    match: userValidation,
    trim: true
  },
  password: {
    type:String,
    required: true,
    minlength: 8,
    maxlength: 18,
    match: passValidation,
    trim: true
  },
  role: {
    type:String,
    required: true,
    match: roleValidation
  },
  first_name: {
    type: String,
    minlength: 3,
    maxlength: maxlength,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    minlength: 3,
    maxlength: maxlength,
    required: true,
    trim: true
  }
});

userSchema.methods.showUser = function() {
  return {
  username: this.username,
  role: this.role
  }
};

const User = mongoose.model('user', userSchema);

module.exports = {User};


