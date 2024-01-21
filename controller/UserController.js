const Users = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const doctorModel = require('../model/Doctors');
const util = require('util');


exports.createUser = async (req, res) => {
    try {
        const { email, password, userDetails } = req.body;

        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(400).json({ "status": "failed", "message": "User already exists" });
        }

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const hashAsync = util.promisify(bcrypt.hash);
        const hashedPassword = await hashAsync(password, 10);

        const newUser = new userModel({
            email,
            password: hashedPassword,
            userDetails,
        });

        await newUser.save();
        const token = jwt.sign({ UserId: newUser._id }, 'Ranashibanee1234', { expiresIn: '5d' });

        return res.status(200).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.signIn = async (req, res) => {
    try {
        const { email, password, userType } = req.body;

        // Find the user by email
        let user;
        if(userType==="doctor"){
            user = await doctorModel.findOne({ email });
        }else{
            user= await userModel.findOne({ email });
        }
        

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (passwordMatch) {
            // Generate a JWT token
            const token = jwt.sign({ Userid:user._id}, 'Ranashibanee1234',{expiresIn: '5d'});
            res.status(200).json({ "status": 'Login Successful','userType':userType,'token':token});
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUser=async(req,res)=>{
    res.send({"user":req.user});
}


exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, { email: 1, userDetails: 1, _id: 1 }); // Projection to select specific fields

        res.status(200).json({"data": users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


