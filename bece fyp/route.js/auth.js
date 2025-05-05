const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');

// Login Page
router.get('/login', authController.loginPage);

// Login Handle
router.post('/login', [
  check('username', 'Username is required').notEmpty(),
  check('password', 'Password is required').notEmpty()
], authController.loginHandle);

// Logout Handle
router.get('/logout', authController.logoutHandle);