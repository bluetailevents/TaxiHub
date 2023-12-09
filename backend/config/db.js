const mongoose = require('mongoose');
const path = require('path');
// Load dotenv explicitly with the path to your .env file
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Set strictQuery option
mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Set strictQuery option to false
    mongoose.set('strictQuery', true);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
