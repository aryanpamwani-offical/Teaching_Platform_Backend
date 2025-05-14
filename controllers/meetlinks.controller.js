const Meetlink = require('../model/meetlinks.model');
const User=require("../model/user.model");
const Classes = require('../model/classes.model');

// Controller to create a new links

exports.createLink = async (req, res) => {
    try {
        
      

        const { classId,studentId, studentName,meetlink } = req.body;
        const user=await User.findById({_id:studentId});
        // console.log(user)
        if (!user) {
            res.status(300).json({
                message: 'User not Found',
            });
        }
       
            console.log(user._id,user.name)

       
         // Create a new links instance
        let newLink = new Meetlink({
            studentid:user._id,
            studentName:user.name,
            meetlink
        });
        let classExists = await Classes.findById(classId);
        if (!classExists) {
            return res.status(404).json({
            message: 'Class not found',
            });
        }
        // Save links to the database
        const savedLink = await newLink.save();

        if (!savedLink) {
            res.status(400).json({
                message: 'Failed to create link',
              
            });
        }
        console.log(savedLink)
        const updateClases=await Classes.findByIdAndUpdate(classId,{
            $set:{
                meetid:savedLink._id,
                meetlink:savedLink.meetlink
            }
        },{
            new:true
        });
        res.status(201).json({
            message: 'Class created successfully',
            class: savedLink,
            updateClases
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating class',
            error: error.message,
        });
    }
};

// Controller to get all links

exports.getAllLinks = async (req, res) => {
    try {
        const links = await Meetlink.find();
        if (!links) {
            res.status(400).json({
                message: 'No Links Found', 
            });
        }
        res.status(200).json({
            message: 'Classes retrieved successfully',
            links,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving classes',
            error: error.message,
        });
    }
};
