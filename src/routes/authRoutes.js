// Import the authentication controller which contains the logic for register and login
const authController = require('../controllers/authController');

// Create a new router object from Express
const router = require('express').Router();

// Route to handle user registration (POST request to /api/auth/register)
router.post('/register', authController.Register);

// Route to handle user login (POST request to /api/auth/login)
router.post('/login', authController.Login);

// Export the router to be used in other parts of the application
module.exports = router;
