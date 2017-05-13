var state = {
  currentUser: "",
  templates: {
    register: `<div class="signupbox">

      <form class="signup">
        <fieldset>
          <legend for="Username and password"></legend>
          <h1>Curriculum Manager Registration</h1>
          
  		  <label for="Username">Username</label>
          <input placeholder="Username!1%" type="text" name="username" id="register_username" required>
  
  		   <label for="Password">Password</label>
          <input placeholder="1234passw0rd" type="password" name="password" id="register_password" required>

          <label for="First_Name">First Name</label>
          <input type="text" name="first_name" id="register_first_name" required>
  
  			<label for="Last_Name">Last Name</label>
          <input type="text" name="last_name" id="register_last_name" required>

          
		<div class="teacher_student_select">
          <label for="teacher" id="teacher_label">Teacher</label>            
          <input type="radio" name="radSize" id="teacher" value="teacher" checked="checked">
          <label for="student" id="student_label">Student</label>
          <input type="radio" name="radSize" id="student" value="student">
    </div>

          <div class="button_container">	
          <button id="register_button" type="submit" name="signup">Sign Up</button>
  </div>
         
        </fieldset>
        
      </form>
    </div>`,

    login: `<div class="signupbox">

      <form class="login">
        <fieldset>
          <legend for="Username and password"></legend>
          <h1>Curriculum Manager Log in</h1>
          <label for="Username">Username</label>
          <input placeholder="Username!1%" type="text" name="username" id="username">

          <label for="Password">Password</label>
          <input placeholder="1234passw0rd" type="password" name="password" id="password">
          <div class="button_container">
           <button id="login_button" name="signup">Login</button>
          </div>

      </form>
    </div>`,
    loggedIn: `
              <li>Home</li>
              <li>Register</li>
              <li>Login</li>
              <li>Dashboard</li>
              <li id="logged_in">
              Not <span>${window.localStorage.getItem('current_user')}?</span class="logged_user">Log out <span>log</span></li>`,
    loggedOut: `
              <li>Home</li>
              <li>Register</li>
              <li>Login</li>
              `
  }

};

function authorizationFormListener() {

  $('nav li').click(function (event) {

    if ($(this).text() === 'Home') {
      $(this).toggleClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');

    }

    if ($(this).text() === 'Register') {
      $('div.background').empty();
      $('div.background').html(state.templates.register);
      $(this).toggleClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
      registerSubmitListener();
    }

    if ($(this).text() === 'Login') {
      $('div.background').empty();
      $('div.background').html(state.templates.login);
      loginSubmitListener();
      $(this).toggleClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
    }

    if ($(this).text() === 'Dashboard') {
      console.log(window.localStorage);
      window.location = window.localStorage.getItem('dashboard_url');
      $(this).toggleClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
    }

    if ($(this).attr('id') === 'logged_in') {
      console.log('clearing token');
      window.localStorage.setItem('token', '');
      appendLoggedinNav();

    }
  })
}


function registerSubmitListener() {

  $('button#register_button').click(function (event) {
    event.preventDefault();
    alert('this listener is running')

    var role = $('input[name="radSize"]:checked').val();
    console.log(role);
    var username = $('input#register_username').val()
    var password = $('input#register_password').val()
    var first_name = $('input#register_first_name').val()
    var last_name = $('input#register_last_name').val()
    var username = $('input#register_username').val()
    console.log(username);
    console.log(password);
    console.log(first_name);
    console.log(last_name);
    var result = validateFormData(password, username, first_name, last_name);
    console.log(result);

  })

}

function loginSubmitListener() {

  $('button#login_button').click(function (event) {
    event.preventDefault();
    console.log('button clicked');
    var username = $('input#username').val();
    var password = $('input#password').val();
    console.log(username);
    console.log(password);
    login(username, password)
      .then(function (userdata) {
        console.log(userdata.token);
        setToken(userdata.token);
        window.localStorage.setItem('dashboard_url', userdata.url);
        window.localStorage.setItem('currentUser', userdata.username);

        appendLoggedinNav();
      })
  });
}

function login(username, password) {
  return $.ajax({
    type: 'POST',
    url: '/auth/login',
    data: {
      "password": password,
      "username": username
    },
  });
}

function register(password, username, first_name, last_name, role) {
  return $.ajax({
    type: 'POST',
    url: '/auth/register',
    data: {
      "password": password,
      "username": username,
      "first_name": first_name,
      "last_name": last_name,
      "role": role
    },
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}

function validateFormData(password, username, first_name, last_name) {
  var errors = {}
  var formData = {}

  // Testing if password is valid
  if (password) {
    var passValid = new RegExp(/^(?=.*\d)(?=.*[A-Za-z])[a-zA-Z\d@!\?\^\\\{\}()#$%_-]{8,20}$/);
    if (passValid.test(password) === false) {
      errors.password = "Password must be 8 to 20 characters, and contain one letter, one number, and one special character";
    } else {
      formData.password = password;
    }
  } else if (password === "") {
    errors.password = "Password is empty";
  }

  // Testing if username is valid
  if (username) {
    var usernameValid = new RegExp(/^\w{4,}$/);
    if (usernameValid.test(username) === false) {
      errors.username = "Username must contain only alphanumberic characters'";
    } else {
      formData.username = username;
    }
  } else if (username === "") {
    errors.username = "Username is empty";
  }

  // Testing if first name is valid  
  var nameValid = new RegExp(/^([ \u00c0-\u01ffa-zA-Z'\-])+$/);

  if (first_name) {
    if (nameValid.test(first_name) === false) {
      errors.first_name = "First name must contain only UTF-8 letters and a hyphen";
    } else {
      formData.first_name = first_name;
    }
  } else if (first_name === "") {
    errors.first_name = "First name is empty";
  }

  // Testing if last_name is valid

  if (last_name) {
    if (nameValid.test(last_name) === false) {
      errors.last_name = "Last name must contain only UTF-8 letters and a hyphen";
    } else {
      formData.last_name = last_name;
    }
  } else if (last_name === "") {
    errors.last_name = "Last name is empty";
  }

  // render to the DOM
  if (Object.keys(errors).length > 0) {
     $('.error').remove();
    Object.keys(errors).forEach(function(elem) {
      console.log(elem);
      console.log(errors);
      var currentError = errors[elem];
      console.log( currentError);
      var errorMsg = `<p class="error" id="${elem}_error"> ${currentError}</p>`;
      console.log(errorMsg);
      $(`input[name="${elem}"]`).after(errorMsg);
    });
    return errors;
  } else {
    formData.message = "No errors found";
    return formData;
  }
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




// function sendTokenAndRedirect() {

//   // breaks redirect if the counter is 1
//   if (window.localStorage.getItem('redirect_counter') === "1") {
//     window.localStorage.setItem('redirect_counter', "0");
//     return;
//   } else if (window.localStorage.getItem('redirect_counter') === "0" || window.localStorage.getItem('redirect_counter') === "undefined") {
//     if (window.localStorage.getItem('token')) {
//       window.localStorage.setItem('redirect_counter', "1");
//       authenticate().then(function (data) {
//         console.log(data.url);
//         appendLoggedinNav();
//         // window.location = data.url;
//       });
//     }
//     return;
//   }


function checkTokenAndAppendNav() {;
  if (window.localStorage.getItem('token')) {
    authenticateToken().
    then(function (userdata) {
        console.log(userdata.url);
        window.localStorage.setItem('current_user', userdata.username);
        window.localStorage.setItem('dashboard_url', userdata.url);

        appendLoggedinNav();
      })
      .catch(function (err) {
        console.log(err);
      })

  }
}


function appendLoggedinNav() {
  if (window.localStorage.getItem('token')) {
    $('div.nav').html(state.templates.loggedIn);
    authorizationFormListener();

  } else {
    $('div.nav').html(state.templates.loggedOut);
    authorizationFormListener();
  }

}

function setToken(data) {
  console.log(data);
  var token = data.token;
  window.localStorage.setItem('token', token);
  var tokenInStorage = window.localStorage.getItem('token');
  console.log(tokenInStorage);
}

function navbarActiveListener() {

  // $('div.nav li').click(function (event) {

  $(this).toggleClass('selected');
  $('div.nav li').not($(this)).removeClass('selected');
  // });
}




($(document).ready(function () {
  authorizationFormListener();
  checkTokenAndAppendNav();
  $(this).scrollTop(0);


}));