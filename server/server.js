const express = require('express');
const path = require('path');// for easier directory navigation
const socketIO = require('socket.io');
const http = require('http');
const port = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New user connected');

   socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
   socket.broadcast.emit('newMessage', generateMessage('Admin', 'New joiner!'));

// Listening for createMessage event
   socket.on('createMessage', (message, callback) => {
      console.log('New message', message);
// Emits event to every connection
   io.emit('newMessage', generateMessage(message.from, message.text));
   callback('This is from the server');
// Emits event to every user apart from the sender
      // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
   });

   socket.on('disconnect', () => {
      console.log('User disconnected');
   });
});

app.get('/', (req, res) => {
});

server.listen(port, () => {
   console.log(`server is up on port ${port}`);
});
