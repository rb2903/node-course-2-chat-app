const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New user connected');

   socket.emit('newMessage', {
      from: 'rob@rob.com',
      text: 'Hello',
      createdAt: 123
   });

   socket.on('createMessage', (newMessage) => {
      console.log('New message', newMessage);
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
