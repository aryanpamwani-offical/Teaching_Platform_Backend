const express = require('express');

const { verifyJwt, isStudent,isAdmin } = require('../middlewares/auth.middleware');
const { createNotes, getAllNotes } = require('../controllers/notes.controller');

const router = express.Router();

// Route for user authentication
router.use(verifyJwt,isStudent);
router.post('/create',verifyJwt,isAdmin, createNotes);
router.post('/getall',verifyJwt, getAllNotes);

module.exports = router;