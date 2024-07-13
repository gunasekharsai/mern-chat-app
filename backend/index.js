const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const connectdb = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageroute');
const { Server } = require('socket.io');
const { createServer } = require('http');

dotenv.config(); // Load environment variables
connectdb();

const app = express();
const httpserver = createServer(app);

app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

app.get("/", (req, res) => {
  res.send('API is running successfully');
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

const io = new Server(httpserver, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});
app.set('io', io);

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('User Joined Room:', room);
  });

  socket.on('typing', (room) => socket.to(room).emit("typing"));
  socket.on("stop typing" , (room) => socket.to(room).emit("stop typing"))

  socket.on('new message', (newMessageReceived) => {
    const chat = newMessageReceived.chat;
    if (!chat.users) return console.log('Chat users not defined');

    chat.users.forEach(user => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});

const PORT = process.env.PORT || 5000;

httpserver.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
