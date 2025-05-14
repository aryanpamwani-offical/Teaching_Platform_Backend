// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { default: dbConnect } = require('./config/database');

// Importing Routes
const userRoutes = require('./routes/user.routes');
const classesRoutes = require('./routes/classes.routes');
const notesRoutes = require('./routes/notes.routes');
const linksRoutes = require('./routes/meetlinks.routes');

const app = express();


// Use environment variable for PORT or default to 3000
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON
app.use(express.json());


// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));


// Middleware to enable CORS
app.use(cors());


// Database connection
dbConnect(); 


// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

//  Routes
app.use('/api/auth', userRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/links', linksRoutes);
app.use('/api/notes', notesRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});