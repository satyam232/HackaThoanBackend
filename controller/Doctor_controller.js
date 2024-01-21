const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const doctorModel=require('../model/Doctors')
const util = require('util');


exports.createDoctors = async (req, res) => {
    try {
        const { email, password, doctorDetails } = req.body;
        const user = await doctorModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already Exists", status: "failed" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required", status: "failed" });
        }
        
        const hashAsync = util.promisify(bcrypt.hash);
        const hashedPassword = await hashAsync(password, 10);

        const newDoctor = new doctorModel({
            email,
            password: hashedPassword,
            doctorDetails
        });

        await newDoctor.save();

        const token = jwt.sign({ UserId: newDoctor._id }, 'Ranashibanee1234', { expiresIn: '5d' });
        return res.status(200).json({ message: "Successfully created", token: token });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ status: "failed", message: "Internal Server Error" });
    }
};


exports.doctorSignin=async (req,res)=>{
    try{
        const {email, password}=req.body;
        const user= await doctorModel.findOne({email});
        if(!user){
            return res.status(400).json({status:"failed",message:"user not found"})
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){
            const token = jwt.sign({ Userid:user._id}, 'Ranashibanee1234',{expiresIn: '5d'});
            return res.status(200).json({status:"Successfully Loggedin",token:token})
        }else{
            return res.status(400).json({status:"failed",message:"incorrect password"});
        }
    }catch(e){
        log.console(e)
        return res.status(400).json({status:"failed",message:"Internal server error"})
    }



}


exports.getDoctor=async(req,res)=>{
    res.send({"doctor":req.user});
}