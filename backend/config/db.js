const mongoose = require('mongoose');

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL,);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};
module.exports = connectdb;
