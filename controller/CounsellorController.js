


const counsellorModel=require('../model/Counselors');
const jwt = require('jsonwebtoken');

const util = require('util');
const bcrypt = require('bcrypt');




exports.createCounsellor=async (req,res)=>{
    try{
        const {email,password}= req.body;
        user= await counsellorModel.findOne({ email });
        if(user){
            return res.status(404).json({"status":"failed","message":"user already exists"});
        }

        if(!password){
            return res.status(400).json({ error: 'Password is required' });
        }
        const hashAsync = util.promisify(bcrypt.hash);
        const hashedPassword = await hashAsync(password, 10);

        const newUser = new counsellorModel({
            email,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign({ UserId: newUser._id }, 'Ranashibanee1234', { expiresIn: '5d' });

        return res.status(200).json({ message: 'User registered successfully', token, "sId":newUser._id});


    }catch(e){
        return res.status(404).json({"status":"failed","message":"error"})

    }
}


exports.signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await counsellorModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (passwordMatch) {
            const token = jwt.sign({ Userid:user._id}, 'Ranashibanee1234',{expiresIn: '1y'});
            res.status(200).json({ "status": 'Login Successful','token':token,'sId':user._id});
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.Userid; // Assuming you're using middleware to authenticate user
        
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ error: 'Both old password and new password are required' });
        }

        const user = await counsellorModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid old password' });
        }

        const hashAsync = util.promisify(bcrypt.hash);
        const hashedPassword = await hashAsync(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
