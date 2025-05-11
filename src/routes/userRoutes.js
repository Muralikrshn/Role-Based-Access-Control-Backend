// Import the Express router
const router = require('express').Router();

// Middleware to verify JWT token
const verifyToken = require('../middlewares/authMiddleware');

// Middleware to authorize user roles
const authorizeRole = require('../middlewares/authorizeRole');

// Route accessible only by users with the "admin" role
router.get('/admin', verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: 'Admin route' });
});

// Route accessible by users with either the "admin" or "manager" role
// Note: verifyToken is mistakenly used twice — you can remove one
router.get('/manager', verifyToken, authorizeRole("admin", "manager"), (req, res) => {
  res.json({ message: 'Manager route' });
});

// Route accessible by "admin", "manager", or "user" roles
// Note: Again, verifyToken is used twice — one should be removed
router.get('/user', verifyToken, authorizeRole("admin", "manager", "user"), (req, res) => {
  res.json({ message: 'User route' });
});

// Export the router so it can be used in the main server file
module.exports = router;
