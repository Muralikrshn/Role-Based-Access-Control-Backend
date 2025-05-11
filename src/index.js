// Importing required modules
const express = require('express'); // Express framework for building web applications
const dotenv = require('dotenv').config(); // Loads environment variables from a .env file
const connectDB = require('./config/dbConnect.js'); // Function to connect to the database
const authRoutes = require('./routes/authRoutes.js'); // Routes for authentication
const userRoutes = require('./routes/userRoutes.js'); // Routes for user operations

// Connect to the database
connectDB();

const app = express(); // Initialize the Express application

// Middlewares
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

// Route handlers
app.use('/api/auth', authRoutes); // Mount authentication routes under /api/auth
app.use('/api/users', userRoutes); // Mount user-related routes under /api/users

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
