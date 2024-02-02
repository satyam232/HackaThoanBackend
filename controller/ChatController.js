const CommentModel = require('../model/ChatModel');  // Adjust the path as needed

const createComment = async (req, res) => {
    try {
        const { userId,category, name, message } = req.body;

        const newComment = new CommentModel({
            userId,
            category,
            name,
            message,
        });

        await newComment.save();

        return res.status(200).json({ message: 'Comment created successfully', comment: newComment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getAllComments = async (req, res) => {
    try {
        const comments = await CommentModel.find();
        return res.status(200).json({ comments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Other controllers like updateComment, deleteComment, etc. can be added as needed

module.exports = {
    createComment,
    getAllComments,
    // Add other controllers here
};
