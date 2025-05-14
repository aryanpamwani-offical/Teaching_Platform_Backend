const User = require('../model/user.model');
const Classes = require('../model/classes.model');

// Controller to create a new class
exports.createClass = async (req, res) => {
    try {
        const { title,date,time,studentId } = req.body;
        // Validate required fields
        if (!title || !date || !time || !studentId) {
            return res.status(400).json({
            message: 'All fields are required: title, date, time, and studentId',
            });
        }

        // Validate date format
        if (isNaN(Date.parse(date))) {
            return res.status(400).json({
            message: 'Invalid date format',
            });
        }

        // Validate time format (HH:MM)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(time)) {
            return res.status(400).json({
            message: 'Invalid time format. Use HH:MM (24-hour format)',
            });
        }

        // Validate studentId exists in the database
        const studentExists = await User.findById(studentId).select("-password");
        if (!studentExists) {
            return res.status(404).json({
            message: 'Student with the given ID does not exist',
            });
        }
        const newDate=new Date(date)
        const dayOfWeek = newDate.getDay(); 

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName = days[dayOfWeek];



        // Create a new class instance
        const newClass = new Classes({
            title,
            date,
            time,
            dayofWeek:dayName
        });

        // Save the class to the database
        const savedClass = await newClass.save();
        // Updating the classes to the user
        const updateStudent=await User.findByIdAndUpdate(studentId,{
            $push:{
                classId:savedClass._id
            }
        },{new:true}
    
    ).select("-password");
        res.status(201).json({
            message: 'Class created successfully',
            class: savedClass,
            updateStudent:updateStudent
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating class',
            error: error.message,
        });
    }
};

// Controller to get all classes
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Classes.find();

        res.status(200).json({
            message: 'Classes retrieved successfully',
            classes,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving classes',
            error: error.message,
        });
    }
};