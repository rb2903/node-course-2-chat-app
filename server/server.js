const express = require('express');
const path = require('path');// for easier directory navigation
const socketIO = require('socket.io');
const http = require('http');
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users;

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New user connected');

   socket.on('join', (params, callback) => {
      if (! isRealString(params.name) || ! isRealString(params.room)) {
         return callback('name and room are required');
      }
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);
      io.to(params.room).emit('updateUserList', users.getUserList(params.room));// Update all users with new list
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} just joined`));
      callback();
   });
// Listening for createMessage event
   socket.on('createMessage', (message, callback) => {
      console.log('New message', message);
// Emits event to every connection
   io.emit('newMessage', generateMessage(message.from, message.text));
   callback();
});
   socket.on('createLocationMessage', (coords) => {
      io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude, coords.longitude));
   });

   socket.on('disconnect', () => {
      var user = users.removeUser(socket.id);
      if (user) {
         io.to(user.room).emit('updateUserList', users.getUserList(user.room));
         io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
      }
   });

});

app.get('/', (req, res) => {
});

server.listen(port, () => {
   console.log(`server is up on port ${port}`);
});
