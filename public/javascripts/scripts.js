


function getUsers(callback){
  callback = callback || function(data){ console.log(data); };

  $.ajax({
    url: '/api/users',
    method: 'get',
    success: function(data){
      var users = data.users;
      callback(users);
    }
  });

}


// Accepts object with: username, body, comments
function renderHaikuHTML(user, haiku){
  haikuTemplate = _.template($('#haiku-template').html());
  var $html = haikuTemplate({
    user: user,
    haiku: haiku
  });
  return $html;
}


function renderUsersData(users){
  $('#haiku-list').empty();
  var user, haiku, $html;
  for (var i = 0; i < users.length; i++) {
    user = users[i];
    if (user.haikus.length > 0){
      haiku = user.haikus[ user.haikus.length-1 ];
      $html = renderHaikuHTML(user, haiku);
      $('#haiku-list').append($html);
    }
  }
}




function writeHaiku(haikuBody){
  $.ajax({
    method: 'post',
    dataType: 'json',
    url: '/api/haikus',
    data: {
      haiku: {body: haikuBody}
    },
    success: function(data){
      updateDataView();
    }
  });
}

function setHaikyWriterHandler(){
  $('form#haiku').on('submit', function(e){
    console.log('Writing Attempted');
    e.preventDefault();
    var haikuBody = $(this).find('textarea[name="haiku[body]"]').val();
    writeHaiku(haikuBody);
  });
}








function writeComment(haiku_id, commentBody){
  $.ajax({
    method: 'post',
    dataType: 'json',
    url: '/api/haikus/' + haiku_id,
    data: {
      comment: {body: commentBody}
    },
    success: function(data){
      updateDataView();
    }
  });
}

function setCommentWriterHandler(){
  $('#haiku-list').on('submit', 'form.commenter', function(e){
    e.preventDefault();
    console.log('Comment Attempted');
    var commentBody = $(this).find('input[name="comment[body]"]').val();
    var haikuId = $(this).find('input[name="haiku_id"]').val();
    writeComment(haikuId, commentBody);
  });
}







function login(username, password){
  $.ajax({
    method: 'post',
    dataType: 'json',
    url: '/api/users/token',
    data: {
      username: username,
      password: password
    },
    success: function(data){
      updateDataView();
    }
  });
}

function setLogInHandler(){
  $('#user-manager form#log-in').on('submit', function(e){
    e.preventDefault();
    console.log('Log-In Attempted');
    var username = $(this).find('input[name="username"]').val();
    var password = $(this).find('input[name="password"]').val();
    login(username, password);
  });
}




function updateDataView(){

  if ($.cookie('token')){
    $('#user-manager').hide();
  } else {
    $('#user-manager').show();
  }

  getUsers(renderUsersData);

}



$(function(){

  updateDataView();

  setHaikyWriterHandler();
  setCommentWriterHandler();
  setLogInHandler()

});
