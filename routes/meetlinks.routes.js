const express = require('express');

const { verifyJwt, isStudent,isAdmin } = require('../middlewares/auth.middleware');
const { createLink, getAllLinks } = require('../controllers/meetlinks.controller');

const router = express.Router();

// Route for user authentication
router.post('/create', verifyJwt,isAdmin,createLink);

router.get('/getall',verifyJwt,getAllLinks);
module.exports = router;