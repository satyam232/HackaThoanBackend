const multer = require('multer');
const path = require('path');
const User = require('../model/userModel');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const userId = req.headers['user-id']; // Extract user ID from headers
    const ext = path.extname(file.originalname);
    cb(null, `${userId}${ext}`);
  },
});

const upload = multer({ storage: storage });

// Middleware for handling image upload
const uploadImage = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const { filename } = req.file;
    const userId = req.headers['user-id'];

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const imageUrl = `uploads/${filename}`;
      user.userDetails.imageUrl = imageUrl;

      await user.save();

      res.json({
        message: 'File uploaded successfully.',
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  });
};

// Route for getting user image
const getImage = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const imageUrl = user.userDetails.imageUrl;

    if (!imageUrl) {
      return res.status(404).json({ error: 'Image not found for the user.' });
    }

    // Send the image file as a response
    res.sendFile(imageUrl, { root: path.join(__dirname, '../') });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
};

module.exports = { uploadImage, getImage };
