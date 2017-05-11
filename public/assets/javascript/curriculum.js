var state = {
  templates: {
    register: `<div class="signupbox">

      <form class="signup">
        <fieldset>
          <legend for="Username and password"></legend>
          <h1>Curriculum Manager Registration</h1>
          
  		  <label for="Username">Username</label>
          <input placeholder="Username!1%" type="text" name="username" id="username">
  
  		   <label for="Password">Password</label>
          <input placeholder="1234passw0rd" type="password" name="password" id="password">

          <label for="First_Name">First Name</label>
          <input type="text" name="First_Name" id="first_name">
  
  			<label for="Last_Name">Last Name</label>
          <input type="text" name="Last_Name" id="last_name">

          
		<div class="teacher_student_select">
          <label for="teacher" id="teacher_label">Teacher</label>            
          <input type="radio" name="radSize" id="teacher" value="teacher" checked="checked">
          <label for="student" id="student_label">Student</label>
          <input type="radio" name="radSize" id="student" value="student">
  </div>

          <div class="button_container">	
          <button type="submit" name="signup">Sign Up</button>
  </div>
         
        </fieldset>
        
      </form>
    </div>`,

    login:`<div class="signupbox">

      <form class="login">
        <fieldset>
          <legend for="Username and password"></legend>
          <h1>Curriculum Manager Log in</h1>
          <label for="Username">Username</label>
          <input placeholder="Username!1%" type="text" name="username" id="username">

          <label for="Password">Password</label>
          <input placeholder="1234passw0rd" type="password" name="password" id="password">

          <button id="login_button" type="submit" name="signup">Login</button>

      </form>
    </div>`



  }



};

function authorizationFormListener() {

$('nav li').click(function(event) {

  if ($(this).text() === 'Register') {
    $('div.background').empty();
    $('div.background').html(state.templates.register);
  }

  if ($(this).text() === 'Login') {
    $('div.background').empty();
    $('div.background').html(state.templates.login);
    loginSubmitListener();
  }
});

}




function loginSubmitListener() {
  
  $('button[type="submit"]').click(function(event) {
    event.preventDefault();
    console.log('button clicked');
    var username = $('input[type="password"]').val();
    var password = $('input[type="email"]').val();
    console.log(username);
    console.log(password);
    login(username, password)
      .then(function(token){
        console.log('this happened');
        
        setToken(token);
      })
  });
}

function login(username, password) {
  return $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/auth/login',
    data: {
      "password": password,
      "username": username
    },
  });
}

function register (password, username, first_name, last_name, role) {
  return $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/auth/login',
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

// function sendToken () {
//   if (window.localStorage.getItem('token')) {

//   }
// }


function setToken (data) {
  console.log(data);
  var token = data.token; 
  window.localStorage.setItem('token', token);
  var tokenInStorage = window.localStorage.getItem('token');
  console.log(tokenInStorage);
}


($(document).ready(function () {
  
  authorizationFormListener();
  $(this).scrollTop(0);


}));
