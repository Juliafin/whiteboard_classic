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

function sendToken () {
  if (window.localStorage.getItem('token')) {

  }
}


function setToken (data) {
  console.log(data);
  var token = data.token; 
  window.localStorage.setItem('token', token);
  var tokenInStorage = window.localStorage.getItem('token');
  console.log(tokenInStorage);
}


($(document).ready(function () {
  loginSubmitListener();
  $(this).scrollTop(0);


}));
