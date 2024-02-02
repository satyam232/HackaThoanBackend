const BookSessionModel=require('../model/SessionBooking');
const UserBookSessionModel=require('../model/UserSideBookingSession')


const CreateBookkingSession= async(req,res)=>{
    try{
        const {doctorId,userId,doctorName,time,date}=req.body;

        const newBookSession=new BookSessionModel({
            doctorId,
            userId,
            doctorName,
            time,
            date
        });
        newBookSession.save();

        return res.status(200).json({"message":"Sucessfully Booked","data":newBookSession})

    }catch(e){
        return res.status(400).json({message:"enternal server error"});

    }

}


const GetBookingSession= async(req,res)=>{
    try{
        const allBookSessions= await BookSessionModel.find();
        return res.status(200).json({ allBookSessions});

    }catch(e){
        return res.send(400).json({message:"error in fetching data "})
    }
}



const UserSideBookingSessionCreate=async (req,res)=>{

    try{
        const {doctorId,userId,doctorname,price,date,time}=req.body;
    const newBooking=new UserBookSessionModel({
        doctorId,
        userId,
        doctorname,
        price,
        date,
        time
    });
    newBooking.save();
    return res.status(200).json({
        message:"seccessfully booked"
    });
    }catch(e){
        return res.send(400).json({
            message:"Failed!!"
        })
    }
    


}


const UserSideBookingSessionGet=async(req,res)=>{
    try{
        const AllBookings=await UserBookSessionModel.find();
        return res.status(200).json({ AllBookings });
    }catch(e){
        return res.status(400).json({message:"there is enternal server error"});

    }
}



module.exports={CreateBookkingSession,
GetBookingSession,
UserSideBookingSessionCreate,
UserSideBookingSessionGet


};
