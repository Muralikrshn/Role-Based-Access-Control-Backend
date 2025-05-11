// Import the jsonwebtoken library for token verification
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token from the request headers
const verifyToken = async (req, res, next) => {
  try {
    // Get the token from request headers (case-insensitive)
    const token = req.headers.Authorization || req.headers.authorization;

    // If token is missing, return unauthorized
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token using the secret key stored in environment variables
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to the request object for use in next middleware or route
    req.user = decoded;

    // Optional: log the decoded user info for debugging
    console.log("The Decoded user is: ", decoded);

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    // If token is invalid or expired, return unauthorized
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Export the middleware to use in route protection
module.exports = verifyToken;
