// Import mongoose to define the schema and model
const mongoose = require('mongoose');

// Define the schema for the User collection
const userSchema = new mongoose.Schema({
  // Username field: must be a unique, required string
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // Password field: required string (should be hashed before saving)
  password: {
    type: String,
    required: true,
  },
  // Role field: must be one of the defined values, default is 'user'
  role: {
    type: String,
    enum: ['admin', 'manager', 'user'], // Restrict role values
    default: 'user',
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model to use it in other parts of the application
module.exports = User;
