const express = require('express');

const { verifyJwt, isAdmin } = require('../middlewares/auth.middleware');
const { createClass, getAllClasses } = require('../controllers/classes.controller');

const router = express.Router();

// Route for user authentication
router.post('/create', verifyJwt,isAdmin,createClass);

router.get('/getall',verifyJwt,getAllClasses);
module.exports = router;