const mongoose = require('mongoose');

// Set strictQuery option
mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    // Use the MONGO_URI environment variable to connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Add any additional options here
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

