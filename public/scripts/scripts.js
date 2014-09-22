var socket = io();
  $('form.chat-box').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });



$(document).ready( function(){

  //Getting the element's new height now
  var sHeight = $('ul#messages')[0].scrollHeight;
  //Scrolling the element to the sHeight
  $('#chatHolder').scrollTop(sHeight);

});

