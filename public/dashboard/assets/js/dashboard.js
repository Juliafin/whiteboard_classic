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


function renderStudentData () {
  getStudentData()
  .then(function(data) {
    console.log(data);
  });
}



($(document).ready(function () {
  $(this).scrollTop(0);
  renderStudentData();


}));