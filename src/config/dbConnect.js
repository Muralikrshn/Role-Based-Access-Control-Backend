// Import mongoose to handle MongoDB connections
const mongoose = require("mongoose");

// Async function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the URI from environment variables
    const connect = await mongoose.connect(process.env.MONGO_URI);

    // Log success message with the host name
    console.log(`Database connected: ${connect.connection.host}`);
  } catch (error) {
    // Log the error message if connection fails
    console.log(`Error: ${error.message}`);

    // Exit the process with failure
    process.exit(1);
  }
}

// Export the connection function to be used in server setup
module.exports = connectDB;
