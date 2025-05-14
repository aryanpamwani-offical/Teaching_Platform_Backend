const Notes = require('../model/notes.model');
const Classes = require('../model/classes.model');

// Helper function to generate slug from title
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim(); // Remove leading/trailing spaces
};

// Controller to create notes and update class
exports.createNotes = async (req, res) => {
    try {
        const { 
            title,
            description_for_seo,
            keywords_for_seo,
            image_url,
            content,
            classId 
        } = req.body;

        // Validate required fields
        if (!title || !description_for_seo || !keywords_for_seo || !image_url || !content) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Validate title length
        if (title.length < 3 || title.length > 100) {
            return res.status(400).json({
                message: 'Title must be between 3 and 100 characters'
            });
        }

        // Generate slug from title
        const slug = generateSlug(title);

        // Check if notes with same slug already exists
        const existingNotes = await Notes.findOne({ slug });
        if (existingNotes) {
            return res.status(400).json({
                message: 'Notes with similar title already exists'
            });
        }

        // Create a new notes instance
        const newNotes = new Notes({
            title,
            slug,
            description_for_seo,
            keywords_for_seo,
            image_url,
            content
        });

        // Save the notes to database
        const savedNotes = await newNotes.save();

        // Update the corresponding class with notes details
        if (classId) {
            // Validate if class exists
            const classExists = await Classes.findById(classId);
            if (!classExists) {
                return res.status(404).json({
                    message: 'Class not found'
                });
            }

            const updatedClass = await Classes.findByIdAndUpdate(
                classId,
                {
                    notesid: savedNotes._id,
                    notesName: savedNotes.title,
                    noteslink: savedNotes.slug
                },
                { new: true }
            );
        }

        res.status(201).json({
            message: 'Notes created successfully',
            notes: savedNotes
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creating notes',
            error: error.message
        });
    }
};

// Controller to get all notes
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find();
        res.status(200).json({
            message: 'Notes retrieved successfully',
            notes
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving notes',
            error: error.message
        });
    }
};

