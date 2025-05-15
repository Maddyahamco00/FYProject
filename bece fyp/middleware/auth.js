// middleware/auth.js


    /**
     * Middleware to ensure the user is authenticated.
     * If not, it redirects to the login page.
     */
     const ensureAuthenticated = (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      // Optionally, you can add a flash message to indicate authentication is required.
      if (req.flash) {
        req.flash('error_msg', 'Please log in to view that resource');
      }
      res.redirect('/auth/login');
    },
  
    /**
     * Middleware to redirect already authenticated users
     * away from the login or register pages.
     */
    const forwardAuthenticated = (req, res, next) => {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/admin/dashboard'); // Redirect to the admin dashboard if logged in.
    }
    module.exports = { ensureAuthenticated, forwardAuthenticated};
  