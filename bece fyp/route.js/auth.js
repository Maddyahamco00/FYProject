// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const { check, validationResult } = require('express-validator');

// // Login Page
// router.get('/login', authController.loginPage);

// // Login Handle
// router.post('/login', [
//   check('username', 'Username is required').notEmpty(),
//   check('password', 'Password is required').notEmpty()
// ], authController.loginHandle);

// // Logout Handle
// router.get('/logout', authController.logoutHandle);

// routes/auth.js
const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../middleware/auth');
const authController = require('../controllers/authController');

// If user is already authenticated, redirect away from the login/register pages
router.get('/login', forwardAuthenticated, authController.renderLogin);
router.get('/register', forwardAuthenticated, authController.renderRegister);

// Post routes for login/register
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
