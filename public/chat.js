//Making connection
var socket = io.connect('http://localhost:3000');

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//emit events

btn.addEventListener("click",function(){
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = '';

});

message.addEventListener('keypress', function(){
  socket.emit('typing',handle.value);
});

message.addEventListener('keydown',function(event){
  if (event.keyCode == 13) {
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    });
    message.value = '';
  }
});

//listen events
socket.on('chat', function(data){
  feedback.innerHTML = '';
  output.innerHTML = "<p><strong>" + data.handle + ": </strong>" + data.message +"</p>" + output.innerHTML;
});

socket.on('typing', function(data){
  feedback.innerHTML = '<p><i>'+ data + ' is typing...</i></p>';
});
