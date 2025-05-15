const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const dbConfig = require('./config/database');

// Initialize app
const app = express();

// Database connection pool
const pool = mysql.createPool(dbConfig);
app.locals.pool = pool;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Passport initialization
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Routes
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
// app.use('/auth', require('./routes/auth'));
// app.use('/admin', require('./routes/admin'));

// Home route
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});