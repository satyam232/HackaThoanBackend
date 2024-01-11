const express = require('express');
const router = express.Router();
const UserController=require('../controller/UserController')
const userauth= require('../middlewares/authmiddleware')
const ChatController=require('../controller/ChatController')
const SessionController=require('../controller/AllSessionsController')

//midware
router.use('/comment',userauth);
router.use('/getuser',userauth)
router.use('/getallusers',userauth)
router.use('/sessions',userauth)



//public
router.post('/signup', UserController.createUser);
router.post('/login', UserController.signIn);


//protected

router.get('/getuser',UserController.getUser)
router.get('/getallusers',UserController.getAllUsers)
router.post('/comment',ChatController.createComment)
router.get('/comment',ChatController.getAllComments)
router.get('/sessions',SessionController.GetSessions)
router.post('/sessions',SessionController.CreateSession)



module.exports = router;