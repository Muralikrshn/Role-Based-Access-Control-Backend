// Import bcrypt for password hashing and comparison
const bcrypt = require('bcrypt');

// Import the User model to interact with MongoDB
const User = require('../models/userModal');

// Import jsonwebtoken for generating and verifying JWT tokens
const jwt = require('jsonwebtoken');

// Controller to handle user registration
const Register = async (req, res) => {
  try {
    // Parse the request body
    const { username, password, role } = req.body;

    // Validate that all required fields are provided
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password and save to DB
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: `User registered successfully ${username}` });

  } catch (error) {
    // Catch and respond to any server errors
    return res.status(500).json({ message: 'Server error' });
  }
};

// Controller to handle user login
const Login = async (req, res) => {
  try {
    // Parse the request body
    const { username, password } = req.body;

    // Validate that both fields are filled
    if (!username || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Find the user in the database
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare entered password with stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token with user ID as payload
    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role }, // Include role if needed for RBAC
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Respond with token and user details (excluding password)
    return res.status(200).json({
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
        role: existingUser.role,
      },
    });

  } catch (error) {
    // Catch and respond to any server errors
    return res.status(500).json({ message: 'Server error' });
  }
};

// Export the controller functions to be used in routes
module.exports = { Register, Login };
