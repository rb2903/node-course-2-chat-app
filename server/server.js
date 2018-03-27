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
      from: 'Admin',
      text: 'Welcome to the chat app!',
      createdAt: new Date().getTime()
   });
   socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'New joiner',
      createdAt: new Date().getTime()
   })

// Listening for createMessage event
   socket.on('createMessage', (message) => {
      console.log('New message', message);
// Emits event to every connection
// io.emit('newMessage', {
//    from: message.from,
//    text: message.text,
//    createdAt: new Date().getTime()
// })
// Emits event to every user apart from the sender
socket.broadcast.emit('newMessage', {
   from: message.from,
   text: message.text,
   createdAt: new Date().getTime()
})
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
