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
    var startTime = $('input[name="startTime"]').val();
    var endTime = $('input[name="endTime"]').val();
    var teacher_comments = $('input[name="teacher_comments"]').val();

    console.log('first_name', first_name, 'last_name', last_name, 'email', email, 'parent_first_name', parent_first_name, 'parent_last_name', parent_last_name,'street_address', street_address, 'apartment_number', apartment_number, 'city', city, 'state', state, 'zipcode', zipcode, 'startDate', startDate, 'weekday', weekday, 'startTime', startTime, 'endTime', endTime, 'teacher_comments', teacher_comments);
    console.log(first_name);
    console.log(last_name);
    
  })

}






function renderStudentData () {
  getStudentData()
  .then(function(data) {
    console.log(data);
  });
}



($(document).ready(function () {
  $(this).scrollTop(0);
  renderStudentData();
  addStudentListener();


}));