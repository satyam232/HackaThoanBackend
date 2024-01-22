const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');  // Include the 'http' module
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const socketIo = require('socket.io');  // Include 'socket.io'
const UserRoutes = require('./routes/usersRoute');

const app = express();
const server = http.createServer(app);  // Create an HTTP server using 'http' module
const io = socketIo(server);  // Pass the server to 'socket.io'

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var clients={}

io.on('connection', (socket) => {
  console.log('connected');
  console.log(socket.id, 'has joined');
  socket.on('signin', (id) => {
    console.log(id);
    clients[id]=socket;
    // console.log(clients);
  });

  socket.on("message",(msg)=>{
    
    let targetId=msg.targetId;
    if(clients[targetId]){
      clients[targetId].emit("message",msg);
    }
    

  })


});

mongoose.connect(process.env.MONGODB_CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/api', UserRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
