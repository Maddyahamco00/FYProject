const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAuthenticated } = require('../middleware/auth');

// Log the imported functions to debug potential undefined values
console.log('ensureAuthenticated:', ensureAuthenticated);
console.log('adminController.dashboard:', adminController.dashboard);

// Dashboard
router.get('/dashboard', ensureAuthenticated, adminController.dashboard);

// Students
router.get('/students', ensureAuthenticated, adminController.students);
router.get('/students/add', ensureAuthenticated, adminController.addStudentPage);
router.post('/students/add', ensureAuthenticated, adminController.addStudent);

// Schools
router.get('/schools', ensureAuthenticated, adminController.schools);

// Results
router.get('/results', ensureAuthenticated, adminController.results);

// Profile
router.get('/profile', ensureAuthenticated, adminController.profile);

module.exports = router;