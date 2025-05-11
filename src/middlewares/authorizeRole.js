// Middleware factory to check if the authenticated user has one of the allowed roles
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    // Get the user's role from the decoded token (added by verifyToken middleware)
    const userRole = req.user.role;

    // If the user's role is not in the allowed roles, deny access
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
    }

    // If the user's role is allowed, proceed to the next middleware or route
    next();
  };
};

// Export the middleware to be used in protected routes
module.exports = authorizeRole;
