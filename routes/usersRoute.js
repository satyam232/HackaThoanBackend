const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const DoctorController = require('../controller/Doctor_controller');
const userauth = require('../middlewares/authmiddleware');
const ChatController = require('../controller/ChatController');
const SessionController = require('../controller/AllSessionsController');
const uploadController = require('../controller/imageUploadController');
const BookingSessionController=require('../controller/BookSessionController')

// Middleware usage
router.use('/comment', userauth);
router.use('/getuser', userauth);
router.use('/getallusers', userauth);
router.use('/sessions', userauth);
router.use('/getDoctors', userauth);

// Public routes
router.post('/signup', UserController.createUser);
router.post('/login', UserController.signIn);
router.post('/doctorSignup', DoctorController.createDoctors);
router.get('/getImage/:userId', uploadController.getImage);

// Protected routes
router.get('/getuser', UserController.getUser);

router.get('/getallusers', UserController.getAllUsers);
router.post('/comment', ChatController.createComment);
router.get('/comment', ChatController.getAllComments);
router.get('/sessions', SessionController.GetSessions);
router.post('/sessions', SessionController.CreateSession);
router.get('/getDoctors', DoctorController.getDoctor);
router.post('/bookSession',BookingSessionController.CreateBookkingSession);
router.get('/bookSession',BookingSessionController.GetBookingSession);
router.post('/bookUserSession',BookingSessionController.UserSideBookingSessionCreate);
router.get('/bookUserSession',BookingSessionController.UserSideBookingSessionGet);

router.post('/uploads', uploadController.uploadImage);


module.exports = router;
