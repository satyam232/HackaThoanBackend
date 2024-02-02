const { Schema, model } = require("mongoose");

const UserSideBookSession=new Schema({
    doctorId:{type:String,required:true},
    userId:{type:String,required:true},
    doctorname:{type:String,required:true},
    price:{type:String, required:true},
    time:{type:String,require:true},
    date:{type:String,required:true}
});


module.exports=model('UserSideBookedSession',UserSideBookSession)