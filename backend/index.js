const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const connectdb = require("./config/db");
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
dotenv.config(); // Load environment variables
connectdb();

const app = express();

app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

app.get("/", (req,res)=>{
  res.send('api is running succeful');
});

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
