const AllSessionModel=require('../model/AllSessionModel');

const CreateSession= async (req,res)=>{
    try{
        const { userId,doctorname,date,time }=req.body;
        const newSession= new AllSessionModel({
            userId,
            doctorname,
            date,
            time
    });
    await newSession.save();
    return res.status(200).json({message:"Sucessfully Created",session:newSession})

    }catch(e){
        console.error(e);
        return res.status(500).json({error:"Failed"})
    }
}

const GetSessions= async (req,res)=>{
    try{
        const session=await AllSessionModel.find();
        return res.status(200).json({session});
    }catch(e){
        console.error(e);
        return res.status(500).json({error:"server error"});
    }
    

}

module.exports={
    CreateSession,
    GetSessions
}