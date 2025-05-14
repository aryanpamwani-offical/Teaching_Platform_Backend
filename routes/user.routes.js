const express = require('express');
const { login,register, getUserDetails } = require('../controllers/user.controller');
const { verifyJwt, isStudent } = require('../middlewares/auth.middleware');

const router = express.Router();

// Route for user authentication
router.post('/register', register);
router.post('/login', login);
router.get('/getSingle',verifyJwt,getUserDetails);
module.exports = router;