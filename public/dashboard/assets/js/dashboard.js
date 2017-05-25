var state = {
  student_records: [],
  templates: {
    addStudent: `
    <div class="addStudent popIn">
    <h1>Add a Student</h1>
      <p class="optional_text">Optional<span class="optional">*</span></p>

      <form class="signup">
        <fieldset class="general_info"> General info
          <br>
          <label for="first_name">First name</label>
          <input type="text" name="first_name" id="first_name">

          <label for="last_name">Last name</label>
          <input type="text" name="last_name" id="last_name">

          <br>
          <label for="email">Email</label>
          <input type="email" name="email" id="email">
          <br>
          <label for="parent_first_name">Parent's First Name<span class="optional">*</span></label>
          <input type="text" name="parent_first_name" id="parent_first_name">

          <label for="parent_last_name">Parent's Last Name<span class="optional">*</span></label>
          <input type="text" name="parent_last_name" id="parent_last_name">
        </fieldset>

        <fieldset> Address
          <br>

          <label for="street_address">Street Address</label>
          <input type="text" name="street_address" id="street_address">

          <label for="apartment_number">Apartment #<span class="optional">*</span></label>
          <input type="text" name="apartment_number" id="apartment_number">
          <br>
          <label for="city">City</label>
          <input type="text" name="city" id="city">

          <label for="state">State</label>
          <select id="state">
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>

          <label for="zipcode">Zipcode</label>
          <input type="text" name="zipcode" id="zipcode">

        </fieldset>


        <fieldset>Student Lesson Time
          <br>

          <label for="startDate">Lesson Start Date</label>
          <input type="date" name="startDate" id="startDate">

          <label for="weekday">Weekday</label>

          <select id="weekday">
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>

          <br>

          <label for="startTime">Start Time<input type="time" name="startTime" id="startTime">

            <label for="endTime">End Time</label>
          <input type="time" name="endTime" id="endTime">

          </label>
        </fieldset>
        <label for="teacher_comments">Teacher Comments<span class="optional">*</span></label>
        <br>
        <input type="textarea" name="teacher_comments" id="teacher_comments">

        <div class="button_container">
          <button type="submit" name="add_student">Add Student</button>
        </div>



      </form>
      </div>
      `,

    unauthorized: `
      <div class="unauthorized">
        <p class="unauthorized_redirect">You are being redirected back to the login page in 5 seconds.</p>
      </div>
        `,

    addStudentProject: `
    <div class="addProject popIn">
      <h1>Add a Project</h1>
      <p class="optional_text">Optional<span class="optional">*</span></p>

      <form class="project">
        
          <label for="project_date">Project Date</label>
          <input type="date" name="project_date" id="project_date">

          <label for="project_name">Project Name</label>
          <input type="text" name="project_name" id="project_name">

          <label for="project_description">Project Description</label>
          <input type="text" name="project_description" id="project_description">

          <label for="project_comments">Project Comments</label>
          <input type="textarea" name="project_comments" id="project_comments">
          
          <div class="button_container">
          <button type="submit" name="add_student">Add Student</button>
          </div>
      
      </form>
    </div>
    `,

    studentList: `
    <div class="studentList popIn">
      <h1>Student List</h1>
      <div class="card_container">
      </div>
    </div>`
  }
};

function navbarListener() {

  $('nav li').click(function (event) {

    if ($(this).text() === 'Add Student') {
      $('div.background').empty();
      $('div.background').html(state.templates.addStudent);
      $(this).toggleClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
      addStudentListener();

    }

    if ($(this).text() === 'Add Student Project') {
      $('div.background').empty();
      // TODO Make template
      $('div.background').html(state.templates.addStudentProject);
      $(this).toggleClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
    }

    if ($(this).text() === 'Student List and Schedule') {
      $('div.background').empty();
      // TODO Make template
      $('div.background').html(state.templates.studentList);
      $(this).toggleClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
      renderStudentCard(state.student_records);
    }

    if ($(this).attr('id') === 'logged_in') {
      console.log('clearing token');
      window.localStorage.setItem('token', '');
      window.localStorage.setItem('current_user', '');
      window.localStorage.setItem('dashboard_url', '');
      window.location = "/";

    }
  });
}

function displayNav() {
  if (window.localStorage.getItem('token')) {

    var loggedIn = `
    <nav>
      <div class="nav">
        <li>Add Student</li>
        <li>Add Student Project</li>      
  		  <li>Student List and Schedule</li>
        <li id="logged_in">Not <span>${window.localStorage.getItem('current_user')}?</span class="logged_user"><br><span>Log out</span></li>
    </div>
  </nav>
              `;

    $('body').append(loggedIn);
    navbarListener();

  }

}



function getStudentData() {
  return $.ajax({
    type: 'GET',
    url: '/cu-manager/',
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}


function postStudentData(studentObj) {
  console.log('this is the obj to be sent', studentObj);
  return $.ajax({
    type: 'POST',
    url: '/cu-manager/',
    data: studentObj,
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}

function addStudentListener() {

  $('button[name="add_student"]').click(function (event) {
    event.preventDefault();
    var studentObj = {

      first_name: $('input[name="first_name"]').val(),
      last_name: $('input[name="last_name"]').val(),
      email: $('input[name="email"]').val(),
      parent_first_name: $('input[name="parent_first_name"]').val(),
      parent_last_name: $('input[name="parent_last_name"]').val(),
      street_address: $('input[name="street_address"]').val(),
      apartment_number: $('input[name="apartment_number"]').val(),
      city: $('input[name="city"]').val(),
      state: $('select#state').val(),
      zipcode: $('input[name="zipcode"]').val(),
      startDate: $('input[name="startDate"]').val(),
      weekday: $('select#weekday').val(),
      startTime: $('input[name="startTime"]').val(), // 12:30
      endTime: $('input[name="endTime"]').val(), // 01:30
      teacher_comments: $('input[name="teacher_comments"]').val()
    };

    // convert time/date fiels to ISO strings
    var startTime = moment(studentObj.startTime, "hh:mm").toISOString();
    var endTime = moment(studentObj.endTime, "hh:mm").toISOString();
    var startDate = moment(studentObj.startDate, 'YYYY-MM-DD').toISOString();
    studentObj.startTime = startTime;
    studentObj.startTime = startTime;
    studentObj.endTime = endTime;
    // console.log(studentObj.startDate);
    console.log(startDate);

    console.log(studentObj);

    var validatedStudent = validateNewStudent(studentObj);
    console.log('validated student', validatedStudent);
    if ('message' in validatedStudent && validatedStudent.message === 'No errors found.') {
      delete validatedStudent.message;
      postStudentData(validatedStudent)
        .then(function(data) {
          console.log(data);
          state.student_records.push(data);
          var success = `
          <p class="success">Student successfully added!</p>
          `
          $('div.button_container').before(success);
          clearStudentform();
        })
        .catch(function(err) {
          console.log('There was an error');
          console.log(err);
        });
    }

  });
}


function validateNewStudent(studentObj) {
  var errors = {};
  var formData = {};
  formData.address = {};
  formData.student_lesson_time = {};
  $('.error').remove();
  console.log(studentObj);

  Object.keys(studentObj).forEach(function (field) {
    console.log(studentObj[field]);
    console.log(field);

    if (studentObj[field] === "") {
      // if the following fields are empty, do nothing (they are optional)
      switch (field) {
      case 'parent_first_name':
      case 'parent_last_name':
      case 'apartment_number':
      case 'teacher_comments':
        break;
      default:
        errors[field] = `The ${field.replace('_', ' ')} field is empty.`;
      }

    } else {
      switch (field) {

      case "first_name":
      case "last_name":
      case "parent_first_name":
      case "parent_last_name":
        var nameValid = new RegExp(/^([ \u00c0-\u01ffa-zA-Z'\-]{1,20})+$/);
        if (!(nameValid.test(studentObj[field]))) {
          errors[field] = `The ${field.replace('_', ' ')} field must be between 1 and 20 characters and contain only UTF-8 letters and/or a hyphen.`;
        } else {
          formData[field] = studentObj[field];
        }
        break;

      case "email":
        var emailValid = new RegExp(/^.+@{1}.+\.[a-zA-Z]{2,4}$/);
        if (!(emailValid.test(studentObj[field]))) {
          errors[field] = `The ${field} field is not valid.`;
        } else {
          formData[field] = studentObj[field];
        }
        break;

      case "city":
        var cityValid = new RegExp(/^([ \u00c0-\u01ffa-zA-Z'\-]{2,20})+$/);
        if (!(cityValid.test(studentObj[field]))) {
          errors[field] = `The ${field} field must contain only UTF-8 letters and be between 2 and 20 characters.`;
        } else {
          formData.address[field] = studentObj[field];
        }
        break;

      case "zipcode":
        var zipcodeValid = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/);
        if (!(zipcodeValid.test(studentObj[field]))) {
          errors[field] = `The ${field} field must either be in the format XXXXX or XXXXX-XXXX.`;
        } else {
          formData.address[field] = studentObj[field];
        }
        break;

      case "apartment_number":
      case "state":
      case "street_address":
      case "teacher_comments":
        formData.address[field] = studentObj[field];
        break;
      
      case "startDate":
      case "weekday":
      case "startTime":
        formData.student_lesson_time[field] = studentObj[field];
        break;
      case "endTime":
        var startTime = moment(studentObj.startTime).format("HH:mm");
        var endTime = moment(studentObj.endTime).format("HH:mm");
        var startTimeN = parseInt(startTime.replace(":",""));
        var endTimeN = parseInt(endTime.replace(":",""));
        console.log(startTime);
        console.log('start time',startTimeN);
        console.log(endTime);
        console.log('end time', endTimeN);
        if (endTimeN < startTimeN) {
          errors[field] = `The ${field} cannot be before the start time.`;
        } else {
          formData.student_lesson_time[field] = studentObj[field];
        }
      }
    }
  });

  if (Object.keys(errors).length > 0) {

    console.log(errors);

    Object.keys(errors).forEach(function (elem) {
      var currentError = errors[elem];
      var errorMsg = `<p class="error" id="${elem}_error"> ${currentError}</p>`;
      $(`input[name="${elem}"]`).after(errorMsg);
    });
    return errors;

  } else {
    formData.message = "No errors found.";
    console.log(formData);
    return formData;
  }
}

function clearStudentform () {
    $('input[name="first_name"]').val(''),
    $('input[name="last_name"]').val(''),
    $('input[name="email"]').val(''),
    $('input[name="parent_first_name"]').val(''),
    $('input[name="parent_last_name"]').val(''),
    $('input[name="street_address"]').val(''),
    $('input[name="apartment_number"]').val(''),
    $('input[name="city"]').val(''),
    $('select#state').val(''),
    $('input[name="zipcode"]').val(''),
    $('input[name="startDate"]').val(''),
    $('select#weekday').val(''),
    $('input[name="startTime"]').val(''), 
    $('input[name="endTime"]').val(''),
    $('input[name="teacher_comments"]').val('')
} 


function renderStudentCard (state) {
  
  state.forEach(function(student_record, index) {
    // var colorArr = ['#4caf50','#9c27b0', '#ff5722', '#ffc107' ];
  // var lastColor = colorArr[Math.floor(Math.random() * colorArr.length)];
  //  var colorIndex = 0;
  //  if (colorIndex > 3) {
  //    colorIndex = 0;
  //  }

    var studentCard = `
    <div class="card flip" id=${student_record.id}>
      <div class="card_color">
      </div>
      <div class="student_container">
      <p class="student_basic_info">Name: ${student_record.first_name} ${student_record.last_name}</p>
      <p class="lesson_time">Lesson time: ${student_record.student_lesson_time.weekday} at ${moment(student_record.student_lesson_time.startTime).format("HH:mm")}</p>
      </div>
    </div>
  `;
    
    setTimeout(function() {
      // var bgColor = colorArr[Math.floor(Math.random() * colorArr.length)];
      // while (bgColor === lastColor) {
      //   bgColor = colorArr[Math.floor(Math.random() * colorArr.length)];
      // }
      $('.card_container').append(studentCard);
      // console.log(colorIndex);
      // console.log(colorArr[colorIndex]);
      // $(`.card_color${colorIndex}`).css('background-color', lastColor);
      // colorIndex +=1;
    }, 400 * index);
    
  })

}



function authenticateToken() {
  return $.ajax({
    type: 'POST',
    url: '/auth/authenticate',
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}




function authenticateResult() {
  authenticateToken()
    .then(function (result) {
      console.log(result);
      if (redirectHome() === false) {
        displayNav();
      } else {
        $('div.background').html(state.templates.unauthorized);
      }
    })
    .catch(function (err) {
      console.log(err);
      $('div.background').html(state.templates.unauthorized);
      redirectHome(err);

    });
}


function redirectHome(err = null) {
  var pathArr = window.location.pathname.split('/');
  var urlUser = pathArr.slice(pathArr.length - 2, pathArr.length - 1)[0];

  if ((urlUser !== localStorage.getItem('current_user')) || (err)) {
    setTimeout(function () {
      window.location = "/";
    }, 5000);
    return true;
  } else {
    return false;
  }
}


function saveStudentData() {
  getStudentData()
    .then(function (data) {
      console.log(data);
      data.student_records.forEach(function (record, index) {
        record.order = index + 1;
        state.student_records.push(record);
      });
      console.log('state.student_records', state.student_records);
    });
}



($(document).ready(function () {
  $(this).scrollTop(0);
  authenticateResult();
  saveStudentData();


}));