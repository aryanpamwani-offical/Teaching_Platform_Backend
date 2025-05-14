const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require("../model/user.model");


// Register Controller

const register = async (req, res) => {
    const { name, password ,phone_number} = req.body;

    if (!name || !password || !phone_number) {
        return res.status(400).json({ message: 'All the fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ phone_number });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to the database
        const newUser = new User({ name, password: hashedPassword,phone_number });
        await newUser.save();
        const createdUser = await User.findById(newUser._id).select("-password");
        if (createdUser) {
            
        }
        res.status(201).json({ message: 'User registered successfully',createdUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login Controller

const login = async (req, res) => {
    const { phone_number, password } = req.body;

    if (!phone_number || !password) {
        return res.status(400).json({ message: ' All fields are required' });
    }

    try {
        // Find user in the database
        const user = await User.findOne({ phone_number });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ phone_number: user.phone_number }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const loggedInUser = await User.findById(user._id).select("-password");
        res.status(200).json({ message: 'Login successful', token,loggedInUser });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Get User Details Controller

const getUserDetails = async (req, res) => {
    const userId = req.user._id;

    try {
        // Find user by ID and populate classId
        const user = await User.findById(userId)
            .select("-password")
            .populate({
                path: "classId",
                model: "Classes"
            });
            
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Clean up null or undefined values and format dates
        const sanitizedUser = JSON.parse(JSON.stringify(user));

        // Format dates if classId is an array
        if (Array.isArray(sanitizedUser.classId)) {
            sanitizedUser.classId = sanitizedUser.classId.map(classItem => {
                if (classItem.date) {
                    const dateObj = new Date(classItem.date);
                    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                    const day = dateObj.getDate().toString().padStart(2, '0');
                    const year = dateObj.getFullYear();
                    classItem.date = `${month}-${day}-${year}`;
                }
                return classItem;
            });
        }

        res.status(200).json({ 
            message: 'User details retrieved successfully', 
            user: sanitizedUser
        });
    } catch (error) {
        console.error('Error in getUserDetails:', error);
        res.status(500).json({ 
            message: 'Error retrieving user details', 
            error: error.message 
        });
    }
};


module.exports = { register, login ,getUserDetails };