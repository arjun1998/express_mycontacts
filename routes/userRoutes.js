const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getCurrentUser} = require('../controllers/userController');
router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/current', getCurrentUser);

module.exports = router;
// This code defines a set of routes for user registration, login, and fetching the current user's data. It uses Express.js to create a router and defines three POST routes: '/register', '/login', and '/current'. Each route sends a JSON response with a message indicating the action taken. The router is then exported for use in other parts of the application.