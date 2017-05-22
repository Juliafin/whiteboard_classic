var state = {
  student_records: "",
  templates: {
    addStudent: `<h1>Add a Student</h1>
    <p class="required_text">Required<span class="required">*</span></p>

    <form class="signup">
      <fieldset class="general_info"> General info
  		<br>

        

        <label for="first_name" style="
">First name<span class="required">*</span></label>
        <input type="text" name="first_name" id="first_name" style="
">

        <label for="last_name">Last name<span class="required">*</span></label>
        <input type="text" name="last_name" id="last_name">
  		
  
		<br>
        <label for="email">Email<span class="required">*</span></label>
        <input type="email" name="email" id="email">
		<br>
        <label for="parent_first_name">Parent's First Name</label>
        <input type="text" name="parent_first_name" id="parent_first_name">

        <label for="parent_last_name">Parent's Last Name</label>
        <input type="text" name="parent_last_name" id="parent_last_name">
      </fieldset>


      <fieldset> Address
  		<br>

        <label for="street_address">Street Address<span class="required">*</span></label>
        <input type="text" name="street_address" id="street_address">

        <label for="apartment_number">Apartment #</label>
        <input type="text" name="apartment_number" id="apartment_number">
		<br>
        <label for="city">City<span class="required">*</span></label>
        <input type="text" name="city" id="city">

        <label for="state">State<span class="required">*</span></label>
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

        <label for="zipcode">Zipcode<span class="required">*</span></label>
        <input type="text" name="zipcode" id="zipcode">

      </fieldset>


      <fieldset>Student Lesson Time
  		<br>

        <label for="startDate">Lesson Start Date<span class="required">*</span></label>
        <input type="date" name="startDate" id="startDate">

        <label for="weekday">Weekday<span class="required">*</span></label>
        
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

        <label for="startTime">Start Time<span class="required">*</span></label>
        <input type="time" name="startTime" id="startTime">

        <label for="endTime">End Time<span class="required">*</span></label>
        <input type="time" name="endTime" id="endTime">

      </fieldset>
      <label for="teacher_comments">Teacher Comments</label>
  		<br>
      <input type="textarea" name="teacher_comments" id="teacher_comments">

      <div class="button_container">
        <button type="submit" name="add_student">Add Student</button>
      </div>


      
    </form>`,

    unauthorized: `
      <div class="unauthorized">
        <p class="unauthorized_redirect">You are being redirected back to the login page in 5 seconds.</p>
      </div>
        `
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
      // $('div.background').html(state.templates.register);
      $(this).toggleClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
    }

    if ($(this).text() === 'Student List and Schedule') {
      $('div.background').empty();
      // TODO Make template
      // $('div.background').html(state.templates.login);
      $(this).toggleClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
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



function getStudentData () {
  return $.ajax({
    type: 'GET',
    url: '/cu-manager/',
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}


function postStudentData (studentObj) {
  return $.ajax({
    type: 'POST',
    url: '/cu-manager/',
    data: studentObj,
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}

function addStudentListener () {
  
  $('button[name="add_student"]').click(function(event) {
    event.preventDefault();
    var first_name = $('input[name="first_name"]').val();
    var last_name = $('input[name="last_name"]').val();
    var email = $('input[name="email"]').val();
    var parent_first_name = $('input[name="parent_first_name"]').val();
    var parent_last_name = $('input[name="parent_last_name"]').val();
    var street_address = $('input[name="street_address"]').val();
    var apartment_number = $('input[name="apartment_number"]').val();
    var city = $('input[name="city"]').val();
    var state = $('select#state').val();
    var zipcode = $('input[name="zipcode"]').val();
    var startDate = $('input[name="startDate"]').val();
    var weekday = $('select#weekday').val();
    var startTime = $('input[name="startTime"]').val(); // 12:30
    var endTime = $('input[name="endTime"]').val(); // 01:30
    var teacher_comments = $('input[name="teacher_comments"]').val();

    console.log(startDate);
    var time = moment(startDate, 'YYYY-MM-DD');
    console.log(time);
    
    console.log('first_name', first_name, 'last_name', last_name, 'email', email, 'parent_first_name', parent_first_name, 'parent_last_name', parent_last_name,'street_address', street_address, 'apartment_number', apartment_number, 'city', city, 'state', state, 'zipcode', zipcode, 'startDate', startDate, 'weekday', weekday, 'startTime', startTime, 'endTime', endTime, 'teacher_comments', teacher_comments);
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




function authenticateResult () {
  authenticateToken()
    .then(function(result) {
      console.log(result);
      if ( redirectHome() === false) {
        displayNav();
      } else {
        $('div.background').html(state.templates.unauthorized);
      }
    })
    .catch(function(err) {
      console.log(err);
      $('div.background').html(state.templates.unauthorized);
      redirectHome(err);
      
    })
}


function redirectHome(err = null) {
  var pathArr = window.location.pathname.split('/');
  var urlUser = pathArr.slice(pathArr.length-2, pathArr.length-1)[0];

  if ((urlUser !== localStorage.getItem('current_user')) || (err) ) {
    setTimeout(function() {
      window.location = "/";
    }, 5000 );
    return true; 
  } else {
    return false; 
  }
}


function renderStudentData () {
  getStudentData()
  .then(function(data) {
    console.log(data);
  });
}



($(document).ready(function () {
  $(this).scrollTop(0);
  authenticateResult();
  renderStudentData();


}));